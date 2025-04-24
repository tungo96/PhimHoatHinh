const { execFile } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');

const video = process.argv[2];
const subtitle = process.argv[3];
const output = process.argv[4] || 'output/video-with-sub.mp4';
const mode = process.argv[5] || 'hard'; // 'hard' hoặc 'soft'

if (!video || !subtitle) {
  console.log('⚠️ Dùng: node add-sub.js input.mp4 input.srt output.mp4 [hard|soft]');
  process.exit(1);
}

let args = [];

if (mode === 'soft') {
  args = ['-i', video, '-i', subtitle, '-c', 'copy', '-c:s', 'mov_text', output];
} else {
  args = ['-i', video, '-vf', `subtitles=${subtitle}`, '-c:a', 'copy', output];
}

execFile(ffmpegPath, args, (err) => {
  if (err) {
    console.error('❌ Lỗi nhúng phụ đề:', err.message);
    return;
  }
  console.log(`✅ Đã tạo video có phụ đề: ${output}`);
});
