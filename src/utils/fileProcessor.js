import fs from 'fs';
import csv from 'csv-parser';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

/**
 * Process an uploaded file based on its mime type or extension.
 * @param {Object} file - The file object from multer (has path, mimetype, originalname)
 * @returns {Promise<Object>} - Returns extracted content and metadata
 */
export async function processFile(file) {
  const { path, mimetype, originalname } = file;

  try {
    if (mimetype === 'text/csv' || originalname.endsWith('.csv')) {
      return await processCSV(path);
    } else if (mimetype === 'application/pdf' || originalname.endsWith('.pdf')) {
      return await processPDF(path);
    } else if (mimetype === 'text/plain' || originalname.endsWith('.txt')) {
      return await processTXT(path);
    } else {
      throw new Error(`Unsupported file type: ${mimetype}`);
    }
  } catch (error) {
    console.error(`Error processing file ${originalname}:`, error);
    throw error;
  }
}

function processCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve({
          type: 'csv',
          content: JSON.stringify(results), // Store CSV rows as JSON string
          metadata: { rowCount: results.length }
        });
      })
      .on('error', (err) => reject(err));
  });
}

async function processPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);

  return {
    type: 'pdf',
    content: data.text,
    metadata: {
      numpages: data.numpages,
      info: data.info,
    }
  };
}

async function processTXT(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return {
    type: 'txt',
    content: content,
    metadata: { length: content.length }
  };
}
