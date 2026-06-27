-- Thêm lĩnh vực và tags cho projects
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'ecommerce',
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

COMMENT ON COLUMN projects.category IS 'ecommerce | integration | system | web';
COMMENT ON COLUMN projects.tags IS 'Tech stack / domain tags e.g. Shopify, Liquid';
