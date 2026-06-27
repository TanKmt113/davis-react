import PropTypes from 'prop-types';

export function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-text-secondary text-sm mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({ title, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-white/5 bg-surface/40 backdrop-blur-xl p-6 ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
}

export function FormField({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5 text-text-secondary">{label}</label>
      <input
        className="w-full px-4 py-2.5 rounded-xl bg-bg-deep/50 border border-white/10 focus:border-primary/50 focus:outline-none text-sm"
        {...props}
      />
    </div>
  );
}

export function FormTextarea({ label, rows = 4, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5 text-text-secondary">{label}</label>
      <textarea
        rows={rows}
        className="w-full px-4 py-2.5 rounded-xl bg-bg-deep/50 border border-white/10 focus:border-primary/50 focus:outline-none text-sm resize-y"
        {...props}
      />
    </div>
  );
}

export function SaveButton({ loading, label = 'Lưu thay đổi' }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-primary text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50"
    >
      {loading ? 'Đang lưu...' : label}
    </button>
  );
}

export function Alert({ type, message }) {
  if (!message) return null;
  const styles = type === 'success'
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    : 'bg-red-500/10 text-red-400 border-red-500/20';
  return <p className={`text-sm border rounded-xl px-4 py-3 mb-4 ${styles}`}>{message}</p>;
}

PageHeader.propTypes = { title: PropTypes.string.isRequired, description: PropTypes.string, action: PropTypes.node };
AdminCard.propTypes = { title: PropTypes.string, children: PropTypes.node, className: PropTypes.string };
FormField.propTypes = { label: PropTypes.string.isRequired };
FormTextarea.propTypes = { label: PropTypes.string.isRequired, rows: PropTypes.number };
SaveButton.propTypes = { loading: PropTypes.bool, label: PropTypes.string };
Alert.propTypes = { type: PropTypes.oneOf(['success', 'error']), message: PropTypes.string };
