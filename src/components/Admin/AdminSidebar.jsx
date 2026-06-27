import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

const NAV_ITEMS = [
  { to: '/admin', end: true, icon: 'material-symbols:dashboard-outline', label: 'Tổng quan' },
  { to: '/admin/hero', icon: 'material-symbols:person-outline', label: 'Hero' },
  { to: '/admin/about', icon: 'material-symbols:info-outline', label: 'Giới thiệu' },
  { to: '/admin/skills', icon: 'material-symbols:psychology-outline', label: 'Kỹ năng' },
  { to: '/admin/services', icon: 'material-symbols:design-services-outline', label: 'Dịch vụ' },
  { to: '/admin/projects', icon: 'material-symbols:work-outline', label: 'Dự án' },
  { to: '/admin/contact', icon: 'material-symbols:mail-outline', label: 'Liên hệ' },
  { to: '/admin/social', icon: 'material-symbols:share-outline', label: 'Mạng xã hội' },
  { to: '/admin/seo', icon: 'material-symbols:travel-explore-outline', label: 'SEO' },
];

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <button type="button" className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} aria-label="Đóng menu" />
      )}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0f1e] border-r border-white/5 flex flex-col transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-white/5">
          <p className="text-xs font-mono text-primary uppercase tracking-widest">CMS Panel</p>
          <h1 className="text-lg font-bold mt-1">TANDEV Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${isActive ? 'bg-primary/15 text-primary font-medium' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`
              }
            >
              <Icon icon={item.icon} className="text-xl shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
