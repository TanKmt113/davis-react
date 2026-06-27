import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/admin/projects" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: authError } = await signIn(email, password);
    setSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    navigate('/admin/projects');
  };

  return (
    <div className="min-h-screen bg-bg-deep flex items-center justify-center px-6">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-white/5 bg-surface/30 backdrop-blur-xl">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-text-secondary text-sm mb-8">Đăng nhập để quản lý dự án portfolio</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-white/10 text-text-primary focus:border-primary/50 focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">Mật khẩu</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-white/10 text-text-primary focus:border-primary/50 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-full bg-gradient-to-r from-accent-purple to-primary text-white font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          <Link to="/" className="hover:text-primary">← Về trang chủ</Link>
        </p>
      </div>
    </div>
  );
}
