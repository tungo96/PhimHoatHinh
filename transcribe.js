const { exec } = require('child_process');

const input = process.argv[2] || 'output/audio.m4a';
const lang = 'zh';

const cmd = `whisper "${input}" --language ${lang} --task transcribe --output_format srt --output_dir output`;

exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error('❌ Lỗi khi chạy Whisper:', err.message);
    return;
  }
  console.log('✅ Đã tạo phụ đề tiếng Trung (.srt) trong thư mục output/');
});
