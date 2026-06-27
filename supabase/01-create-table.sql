-- Chạy 1 lần trong Supabase SQL Editor
-- https://supabase.com/dashboard/project/dbilfrscakaxahxsvzld/sql/new

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  sub_title TEXT NOT NULL,
  description TEXT NOT NULL,
  product_link TEXT DEFAULT '#',
  image_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  effect TEXT DEFAULT 'fade-up',
  duration TEXT DEFAULT '500',
  delay TEXT DEFAULT '300',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read active projects" ON projects;
CREATE POLICY "Public read active projects"
  ON projects FOR SELECT
  USING (is_active = true);
