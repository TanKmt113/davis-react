-- Tăng giới hạn upload ảnh dự án: 5MB → 20MB
UPDATE storage.buckets
SET file_size_limit = 20971520
WHERE id = 'project-images';
