const fs = require('fs');
const { parse, stringify } = require('subtitle');
const translate = require('@vitalets/google-translate-api');

const inputFile = 'video.mp4';
const outputFile = 'vn/video.mp4'

if (!inputFile || !outputFile) {
  console.log("Cách dùng: node translate-srt.js input.srt output.srt");
  process.exit(1);
}

const srtText = fs.readFileSync(inputFile, 'utf8');
const entries = parse(srtText);

async function translateSubs() {
  const translated = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    if (entry.type === 'cue') {
      try {
        const res = await translate(entry.data.text, { from: 'zh-CN', to: 'vi' });
        entry.data.text = res.text;
        console.log(`✅ [${i + 1}/${entries.length}] ${res.text}`);
      } catch (err) {
        console.error(`❌ Lỗi khi dịch dòng ${i + 1}:`, err.message);
      }
    }

    translated.push(entry);
  }

  const output = stringify(translated);
  fs.writeFileSync(outputFile, output, 'utf8');
  console.log(`🎉 Đã xuất ra file: ${outputFile}`);
}

translateSubs();
