-- Chạy script này trong Supabase Dashboard → SQL Editor

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
  category TEXT DEFAULT 'ecommerce',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read active projects" ON projects;
CREATE POLICY "Public read active projects"
  ON projects FOR SELECT
  USING (is_active = true);

-- Dữ liệu mẫu (chạy 1 lần)
INSERT INTO projects (title, sub_title, description, product_link, image_url, sort_order, delay) VALUES
(
  'Hệ thống POS Bán lẻ',
  'Bán lẻ / POS',
  'Phát triển hệ thống POS bán lẻ multi-store, tích hợp hardware (thermal printer, barcode scanner, touchscreen), custom driver SDK.

Kết quả: Đạt 99.8% uptime cho 25+ điểm bán, xử lý 5K transactions/ngày.',
  '#',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQzi7yqOPjO83tXhmVb1EWJ1fSIdUIi-X3Vv8gTXS0zfBU1YQj9ZhzD5LreJqOrV7uY0xirxskzPWu3o2E5LUCRAaqAacQqh6qpsCMU9umHIKzrF52wzAqbc4Mb2r74m_UtB2JzGNp9IyLgzh5f0R5QBEZcdrgaGMJP4gRzMCZK0EPEj9hCQ-LYZo1g3IDjDkMTJTCUe7BSvVr688Es3PmxrRljkQ4FoCYkf_QMGjHRpmhHT6rmAUn-8NASyhlwey1wkTrGg6pUxp0',
  1,
  '300'
),
(
  'E-commerce MedusaJS',
  'E-commerce / VNPAY / GHTK',
  'Thiết kế E-commerce headless trên MedusaJS + Next.js, tích hợp VNPAY (QR/ATM), GHTK API (real-time tracking).

Kết quả: Tối ưu LCP xuống 1.5s (Google PageSpeed 95+), tăng conversion rate 25%.',
  '#',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA5zd10E_01bsaPEF26VHhPdZzzIjVFfZW7yCNEN_Cnejh9uv-w-wDfdRZmtwrgB_dgKvW6yNpwLjJ8Lt9LzIKGybDIF347QmQld8_VQ2Ux8zdoapLiUipxCuEbz75gIaqOlzu37gc-v3ehnnM1QLbthVd_ggQO4PkTbyAQ3RpaPy3F9QUbRxfhotP7v7hPo0n6CDssn3hplw_1YPM1rzkTUeZHZJo6ihdegGDbgIIZh47Ljy9Q5C30sqtt_eLO28tJ8XdVWWBoOCcS',
  2,
  '400'
),
(
  'Đồng bộ Nhanh.vn → Shopify',
  'Tích hợp / Tự động hóa',
  'Giải pháp tự động hóa đồng bộ dữ liệu sản phẩm, tồn kho và đơn hàng giữa nền tảng Nhanh.vn và Shopify. Xử lý webhook real-time, conflict resolution, retry mechanism.',
  '#',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuOkJVzwUXJSs838v0_VY-sbzvNRoXD7EI3pdE2bZX96ZVZK5Lq-CIV1wLo9Fv5iV3o5SlGKK5G2bwkk8KhqxL0-EUrym9XPVujkt2KAFpGCOmoI-_4dI4nr_WFnN1B25wzOzVx5c2WPBCbNQyuTkvT9aHoBahKxB90Bep6u-Lib31ebokTXspk0Shc6Xx_LEVcY3TLlH06KDjc7ot5mkt6mKfb3DIrEuzp4bgf5YaB1pUzbszViEctQjS10Iia_Sx76vfmc-cPsZVs',
  3,
  '500'
),
(
  'WordPress E-commerce',
  'WordPress / WooCommerce',
  'Xây dựng trang thương mại điện tử chuyên nghiệp trên nền tảng WordPress và WooCommerce. Tối ưu SEO, tích hợp cổng thanh toán và vận chuyển nội địa.',
  '#',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
  4,
  '700'
),
(
  'Shopify Custom Theme & App',
  'Shopify / Liquid / App Integration',
  'Phát triển theme Shopify custom từ Figma, tối ưu UX/UI và tốc độ tải trang. Xây dựng logic dynamic bằng Liquid, tích hợp Shopify App (Klaviyo, Judge.me, Shopify Flow) và custom API.

Kết quả: Tăng tốc độ tải trang 40%, cải thiện SEO (PageSpeed 90+), tăng conversion rate 20%.',
  '#',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
  5,
  '800'
),
(
  'Haravan E-commerce Customization',
  'Haravan / Liquid / Frontend',
  'Tùy chỉnh giao diện và logic bán hàng trên Haravan bằng Liquid, xây dựng các module như combo sản phẩm, flash sale, và upsell/cross-sell.

Kết quả: Tăng AOV (Average Order Value) 18%, cải thiện trải nghiệm người dùng trên mobile.',
  '#',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  6,
  '1000'
);
