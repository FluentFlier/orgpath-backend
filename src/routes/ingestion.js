import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { processFile } from '../utils/fileProcessor.js';
import pool from '../../db/db.js'; // Assuming db connection is exported as default or named export

const router = express.Router();

// Configure Multer for local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// POST /api/ingestion/upload
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Create Ingestion Job
        const insertJobQuery = `
      INSERT INTO ingestion_jobs (file_name, file_path, file_type, status, uploaded_by)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
        // TODO: Get actual user ID from auth middleware. Using 1 (admin) for now if not present.
        const userId = req.user ? req.user.id : 1;

        const jobResult = await client.query(insertJobQuery, [
            req.file.originalname,
            req.file.path,
            req.file.mimetype,
            'processing',
            userId
        ]);
        const jobId = jobResult.rows[0].id;

        // 2. Process the file
        const processedData = await processFile(req.file);

        // 3. Store extracted document content
        const insertDocQuery = `
      INSERT INTO documents (ingestion_job_id, title, content, metadata)
      VALUES ($1, $2, $3, $4)
    `;
        await client.query(insertDocQuery, [
            jobId,
            req.file.originalname,
            processedData.content,
            processedData.metadata
        ]);

        // 4. Update Job Status
        await client.query('UPDATE ingestion_jobs SET status = $1 WHERE id = $2', ['completed', jobId]);

        await client.query('COMMIT');

        res.status(201).json({
            message: 'File uploaded and processed successfully',
            jobId: jobId,
            metadata: processedData.metadata
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Ingestion Error:', error);

        // Attempt to update job status to failed if job was created
        // Note: This is outside the transaction, so we might need a separate try/catch or just log it
        // For simplicity in this MVP, we just return the error.

        res.status(500).json({ error: 'Failed to process file', details: error.message });
    } finally {
        client.release();
    }
});

export default router;
