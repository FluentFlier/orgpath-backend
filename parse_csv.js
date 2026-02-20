import fs from 'fs';
import { parse } from 'csv-parse/sync';

// 1. Read the CSV file
console.log("Reading questions.csv...");
const rawCsv = fs.readFileSync('questions.csv', 'utf-8');

const questions = [];

try {
  // 2. Parse the CSV with RELAXED rules for Excel
  const records = parse(rawCsv, {
    skip_empty_lines: true,
    relax_column_count: true,
    relax_quotes: true, // <--- THIS FIXES THE QUOTE ERROR
    bom: true           // <--- THIS FIXES INVISIBLE EXCEL CHARACTERS
  });

  // 3. Loop through rows (Starting at index 2 to skip headers)
  for (let i = 2; i < records.length; i++) {
    const row = records[i];
    
    // Skip if there is no category
    if (!row[0] || row[0].trim() === '') continue;

    const options = [];
    
    // Loop through the 6 possible pairs of Score/Text (Columns 7 to 18)
    for (let j = 7; j <= 17; j += 2) {
      const scoreStr = row[j];
      const textStr = row[j + 1];
      
      if (scoreStr !== undefined && scoreStr !== '' && textStr && textStr.trim() !== '') {
        let parsedScore = parseInt(scoreStr, 10);
        if (!isNaN(parsedScore)) {
          options.push({
            value: parsedScore,
            text: textStr.trim().replace(/\n/g, ' ')
          });
        }
      }
    }

    // Combine the Question and the Accompanying Statement if both exist
    let qText = row[5] ? row[5].trim() : '';
    if (row[6] && row[6].trim() !== '') {
      qText += '\n\n' + row[6].trim();
    }

    questions.push({
      id: parseInt(row[4], 10) || i,
      category: row[0].trim(),
      capability: row[1].trim(),
      type: row[2].trim(),
      question: qText,
      options: options
    });
  }

  // 4. Save to the React Frontend directory
  const outputDir = './react-frontend/src/data';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(`${outputDir}/questions.json`, JSON.stringify(questions, null, 2));

  console.log(`✅ Success! Generated questions.json with ${questions.length} total questions.`);
} catch (err) {
  console.error("❌ Error parsing CSV:", err.message);
  console.log("Note: Make sure you didn't accidentally copy the .xlsx file instead of the .csv file!");
}