import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { PageHeader, AdminCard } from '../../components/Admin/AdminUI';

const SECTIONS = [
  { to: '/admin/hero', icon: 'material-symbols:person-outline', label: 'Hero', desc: 'Banner trang chủ' },
  { to: '/admin/about', icon: 'material-symbols:info-outline', label: 'Giới thiệu', desc: 'Thông tin cá nhân' },
  { to: '/admin/skills', icon: 'material-symbols:psychology-outline', label: 'Kỹ năng', desc: 'Nhóm kỹ năng' },
  { to: '/admin/services', icon: 'material-symbols:design-services-outline', label: 'Dịch vụ', desc: 'Dịch vụ & giải pháp' },
  { to: '/admin/projects', icon: 'material-symbols:work-outline', label: 'Dự án', desc: 'Portfolio dự án' },
  { to: '/admin/contact', icon: 'material-symbols:mail-outline', label: 'Liên hệ', desc: 'Form liên hệ' },
  { to: '/admin/social', icon: 'material-symbols:share-outline', label: 'Mạng xã hội', desc: 'Social links' },
  { to: '/admin/seo', icon: 'material-symbols:travel-explore-outline', label: 'SEO', desc: 'Open Graph · Twitter · Google' },
];

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Tổng quan" description="Quản lý toàn bộ nội dung website portfolio" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map((s) => (
          <Link key={s.to} to={s.to} className="group rounded-2xl border border-white/5 bg-surface/40 p-5 hover:border-primary/30 hover:bg-surface/60 transition-all">
            <Icon icon={s.icon} className="text-3xl text-primary mb-3" />
            <h3 className="font-semibold group-hover:text-primary transition-colors">{s.label}</h3>
            <p className="text-xs text-text-secondary mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>
      <AdminCard title="Hướng dẫn nhanh" className="mt-8">
        <ul className="text-sm text-text-secondary space-y-2 list-disc list-inside">
          <li>Chọn section bên trái để chỉnh sửa nội dung</li>
          <li>Thay đổi được lưu trực tiếp lên Supabase — website cập nhật khi reload</li>
          <li>Ảnh dự án upload qua mục <strong className="text-text-primary">Dự án</strong></li>
        </ul>
      </AdminCard>
    </div>
  );
}
