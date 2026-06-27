-- Admin RLS: authenticated users can CRUD all projects
-- (Public read active projects policy remains for anonymous visitors)

CREATE POLICY "Admin read all projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);
