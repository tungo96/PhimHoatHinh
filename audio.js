const { execFile } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');

const input = process.argv[2];
const output = process.argv[3] || 'output.m4a';

if (!input) {
  console.error('⚠️ Cách dùng: node extract-audio.js input.mp4 output.m4a');
  process.exit(1);
}

const args = [
  '-i', input,     // input file
  '-vn',           // không lấy video
  '-acodec', 'copy', // giữ nguyên codec audio
  output
];

execFile(ffmpegPath, args, (err, stdout, stderr) => {
  if (err) {
    console.error('❌ Lỗi khi tách audio:', err);
    return;
  }
  console.log(`✅ Đã tạo file audio: ${output}`);
});
