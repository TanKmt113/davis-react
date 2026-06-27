/**
 * Setup Supabase: tạo bảng (nếu cần) + seed dữ liệu mẫu.
 *
 * Cách 1 — tự động (khuyên dùng):
 *   Thêm SUPABASE_DB_URL vào .env (Dashboard → Database → Connection string → URI)
 *   npm run setup:supabase
 *
 * Cách 2 — thủ công:
 *   Chạy supabase/01-create-table.sql trong SQL Editor, rồi npm run setup:supabase
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;
const dbUrl = process.env.SUPABASE_DB_URL;

if (!supabaseUrl || !secretKey) {
  console.error('❌ Thiếu SUPABASE_URL hoặc SUPABASE_SECRET_KEY trong .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, secretKey);

const projects = [
  {
    title: 'Hệ thống POS Bán lẻ',
    sub_title: 'Bán lẻ / POS',
    description: 'Phát triển hệ thống POS bán lẻ multi-store, tích hợp hardware (thermal printer, barcode scanner, touchscreen), custom driver SDK.\n\nKết quả: Đạt 99.8% uptime cho 25+ điểm bán, xử lý 5K transactions/ngày.',
    product_link: '#',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQzi7yqOPjO83tXhmVb1EWJ1fSIdUIi-X3Vv8gTXS0zfBU1YQj9ZhzD5LreJqOrV7uY0xirxskzPWu3o2E5LUCRAaqAacQqh6qpsCMU9umHIKzrF52wzAqbc4Mb2r74m_UtB2JzGNp9IyLgzh5f0R5QBEZcdrgaGMJP4gRzMCZK0EPEj9hCQ-LYZo1g3IDjDkMTJTCUe7BSvVr688Es3PmxrRljkQ4FoCYkf_QMGjHRpmhHT6rmAUn-8NASyhlwey1wkTrGg6pUxp0',
    sort_order: 1,
    delay: '300',
  },
  {
    title: 'E-commerce MedusaJS',
    sub_title: 'E-commerce / VNPAY / GHTK',
    description: 'Thiết kế E-commerce headless trên MedusaJS + Next.js, tích hợp VNPAY (QR/ATM), GHTK API (real-time tracking).\n\nKết quả: Tối ưu LCP xuống 1.5s (Google PageSpeed 95+), tăng conversion rate 25%.',
    product_link: '#',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5zd10E_01bsaPEF26VHhPdZzzIjVFfZW7yCNEN_Cnejh9uv-w-wDfdRZmtwrgB_dgKvW6yNpwLjJ8Lt9LzIKGybDIF347QmQld8_VQ2Ux8zdoapLiUipxCuEbz75gIaqOlzu37gc-v3ehnnM1QLbthVd_ggQO4PkTbyAQ3RpaPy3F9QUbRxfhotP7v7hPo0n6CDssn3hplw_1YPM1rzkTUeZHZJo6ihdegGDbgIIZh47Ljy9Q5C30sqtt_eLO28tJ8XdVWWBoOCcS',
    sort_order: 2,
    delay: '400',
  },
  {
    title: 'Đồng bộ Nhanh.vn → Shopify',
    sub_title: 'Tích hợp / Tự động hóa',
    description: 'Giải pháp tự động hóa đồng bộ dữ liệu sản phẩm, tồn kho và đơn hàng giữa nền tảng Nhanh.vn và Shopify. Xử lý webhook real-time, conflict resolution, retry mechanism.',
    product_link: '#',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuOkJVzwUXJSs838v0_VY-sbzvNRoXD7EI3pdE2bZX96ZVZK5Lq-CIV1wLo9Fv5iV3o5SlGKK5G2bwkk8KhqxL0-EUrym9XPVujkt2KAFpGCOmoI-_4dI4nr_WFnN1B25wzOzVx5c2WPBCbNQyuTkvT9aHoBahKxB90Bep6u-Lib31ebokTXspk0Shc6Xx_LEVcY3TLlH06KDjc7ot5mkt6mKfb3DIrEuzp4bgf5YaB1pUzbszViEctQjS10Iia_Sx76vfmc-cPsZVs',
    sort_order: 3,
    delay: '500',
  },
  {
    title: 'WordPress E-commerce',
    sub_title: 'WordPress / WooCommerce',
    description: 'Xây dựng trang thương mại điện tử chuyên nghiệp trên nền tảng WordPress và WooCommerce. Tối ưu SEO, tích hợp cổng thanh toán và vận chuyển nội địa.',
    product_link: '#',
    image_url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
    sort_order: 4,
    delay: '700',
  },
  {
    title: 'Shopify Custom Theme & App',
    sub_title: 'Shopify / Liquid / App Integration',
    description: 'Phát triển theme Shopify custom từ Figma, tối ưu UX/UI và tốc độ tải trang. Xây dựng logic dynamic bằng Liquid, tích hợp Shopify App (Klaviyo, Judge.me, Shopify Flow) và custom API.\n\nKết quả: Tăng tốc độ tải trang 40%, cải thiện SEO (PageSpeed 90+), tăng conversion rate 20%.',
    product_link: '#',
    image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
    sort_order: 5,
    delay: '800',
  },
  {
    title: 'Haravan E-commerce Customization',
    sub_title: 'Haravan / Liquid / Frontend',
    description: 'Tùy chỉnh giao diện và logic bán hàng trên Haravan bằng Liquid, xây dựng các module như combo sản phẩm, flash sale, và upsell/cross-sell.\n\nKết quả: Tăng AOV (Average Order Value) 18%, cải thiện trải nghiệm người dùng trên mobile.',
    product_link: '#',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    sort_order: 6,
    delay: '1000',
  },
];

const isTableMissing = (error) =>
  error?.code === 'PGRST205' || error?.message?.includes("Could not find the table 'public.projects'");

async function createTableViaPg() {
  if (!dbUrl) return false;

  let pg;
  try {
    pg = await import('pg');
  } catch {
    console.error('❌ Cần cài pg: npm install --save-dev pg');
    return false;
  }

  const client = new pg.default.Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });

  const ddl = fs.readFileSync(path.join(__dirname, '../supabase/01-create-table.sql'), 'utf8');

  try {
    await client.connect();
    await client.query(ddl);
    console.log('✅ Đã tạo bảng projects qua SUPABASE_DB_URL');
    return true;
  } catch (error) {
    console.error('❌ Không thể tạo bảng qua SUPABASE_DB_URL:', error.message);
    return false;
  } finally {
    await client.end();
  }
}

function printManualSteps() {
  console.log('📦 Bảng projects chưa tồn tại.');
  console.log('');
  console.log('👉 Cách nhanh — mở SQL Editor, paste & Run:');
  console.log('   https://supabase.com/dashboard/project/dbilfrscakaxahxsvzld/sql/new');
  console.log('');
  console.log('   File: supabase/01-create-table.sql');
  console.log('');
  console.log('👉 Hoặc thêm SUPABASE_DB_URL vào .env để script tự tạo bảng:');
  console.log('   Dashboard → Project Settings → Database → Connection string (URI)');
  console.log('');
  console.log('   Sau đó chạy lại: npm run setup:supabase');
}

let { count, error: countError } = await supabase
  .from('projects')
  .select('*', { count: 'exact', head: true });

if (isTableMissing(countError)) {
  const created = await createTableViaPg();

  if (!created) {
    printManualSteps();
    process.exit(1);
  }

  ({ count, error: countError } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true }));
}

if (countError) {
  console.error('❌ Lỗi:', countError.message);
  process.exit(1);
}

if (count > 0) {
  console.log(`✅ Bảng projects đã có ${count} dự án:`);
  const { data } = await supabase.from('projects').select('title').order('sort_order');
  data?.forEach((p, i) => console.log(`   ${i + 1}. ${p.title}`));
  process.exit(0);
}

const { error: insertError } = await supabase.from('projects').insert(projects);

if (insertError) {
  if (isTableMissing(insertError)) {
    printManualSteps();
  } else {
    console.error('❌ Lỗi seed:', insertError.message);
  }
  process.exit(1);
}

console.log(`✅ Đã thêm ${projects.length} dự án vào Supabase.`);
