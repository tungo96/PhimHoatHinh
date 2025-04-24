# 1. Tách audio
node audio.js input.mp4 output/audio.m4a

# 2. Chạy Whisper tạo file .srt
node transcribe.js output/audio.m4a

# 3. Dịch phụ đề (ví dụ file tên là audio.srt)
node index.js output/audio.srt output/audio.vi.srt

#4 nhúng phụ đề cứng vào video
node add-sub.js input.mp4 output/audio.vi.srt output/hard-sub.mp4 hard

#5 nhúng phụ đề mềm vô video
node add-sub.js input.mp4 output/audio.vi.srt output/soft-sub.mp4 soft


với run-all.js tôi sẽ chạy 
node run-all.js input.mp4 => sẽ ra video cuối cùng cho tôi


