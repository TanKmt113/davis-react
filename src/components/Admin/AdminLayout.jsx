import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-text-primary flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 border-b border-white/5 bg-[#060b18]/90 backdrop-blur-xl px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button type="button" className="lg:hidden p-2 rounded-lg border border-white/10" onClick={() => setSidebarOpen(true)}>
              <Icon icon="material-symbols:menu-rounded" className="text-xl" />
            </button>
            <span className="text-sm text-text-secondary hidden sm:inline">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank" className="text-sm px-4 py-2 rounded-xl border border-white/10 hover:border-primary/40 flex items-center gap-1.5">
              <Icon icon="material-symbols:open-in-new" className="text-base" />
              Xem site
            </Link>
            <button type="button" onClick={handleSignOut} className="text-sm px-4 py-2 rounded-xl border border-white/10 hover:border-red-400/40 hover:text-red-400">
              Đăng xuất
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
