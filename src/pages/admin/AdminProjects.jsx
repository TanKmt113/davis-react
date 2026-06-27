import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { Alert, AdminCard, PageHeader } from '../../components/Admin/AdminUI';
import ProjectForm from '../../components/Admin/ProjectForm';
import {
  PROJECT_CATEGORIES,
  getCategoryMeta,
} from '../../constants/projectCategories';
import {
  createProject,
  deleteProject,
  fetchAllProjects,
  updateProject,
} from '../../services/adminProjectService';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const loadProjects = useCallback(async () => {
    try {
      setError('');
      const data = await fetchAllProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải dự án');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const categoryCounts = useMemo(() => {
    const counts = { all: projects.length };
    PROJECT_CATEGORIES.forEach((cat) => {
      counts[cat.id] = projects.filter((p) => p.category === cat.id).length;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchCategory = activeCategory === 'all' || project.category === activeCategory;
      if (!matchCategory) return false;
      if (!query) return true;

      const haystack = [
        project.title,
        project.sub_title,
        ...(project.tags ?? []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [projects, activeCategory, search]);

  const handleSave = async (form) => {
    setSubmitting(true);
    setError('');
    try {
      if (editing?.id) await updateProject(editing.id, form);
      else await createProject(form);
      setShowForm(false);
      setEditing(null);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể lưu dự án');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa dự án này?')) return;
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể xóa dự án');
    }
  };

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (showForm) {
    return (
      <div>
        <PageHeader
          title={editing ? 'Sửa dự án' : 'Thêm dự án mới'}
          description="Phân loại theo lĩnh vực và gắn tags công nghệ"
          action={
            <button
              type="button"
              onClick={() => { setShowForm(false); setEditing(null); }}
              className="px-4 py-2 rounded-xl border border-white/10 text-sm hover:border-primary/40"
            >
              ← Quay lại danh sách
            </button>
          }
        />
        <Alert type="error" message={error} />
        <ProjectForm
          initial={editing}
          onSubmit={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          submitting={submitting}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Quản lý dự án"
        description={`${projects.length} dự án · ${PROJECT_CATEGORIES.length} lĩnh vực`}
        action={
          <button
            type="button"
            onClick={openCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-primary text-white text-sm font-medium"
          >
            + Thêm dự án
          </button>
        }
      />

      <Alert type="error" message={error} />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <StatCard label="Tổng dự án" value={categoryCounts.all} icon="mdi:briefcase-outline" />
        {PROJECT_CATEGORIES.map((cat) => (
          <StatCard
            key={cat.id}
            label={cat.label}
            value={categoryCounts[cat.id] ?? 0}
            icon={cat.icon}
            active={activeCategory === cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? 'all' : cat.id)}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Icon
            icon="mdi:magnify"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, tag, công nghệ..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface/40 border border-white/10 text-sm focus:border-primary/50 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterPill
            active={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            label={`Tất cả (${categoryCounts.all})`}
          />
          {PROJECT_CATEGORIES.map((cat) => (
            <FilterPill
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              label={`${cat.label.split(' ')[0]} (${categoryCounts[cat.id] ?? 0})`}
              icon={cat.icon}
            />
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <AdminCard>
          <p className="text-center text-text-secondary py-8">
            {search || activeCategory !== 'all'
              ? 'Không tìm thấy dự án phù hợp.'
              : 'Chưa có dự án nào. Nhấn "Thêm dự án" để bắt đầu.'}
          </p>
        </AdminCard>
      ) : (
        <AdminCard className="!p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-bg-deep/40 text-left text-text-secondary">
                  <th className="px-4 py-3 font-medium w-12">#</th>
                  <th className="px-4 py-3 font-medium w-16">Ảnh</th>
                  <th className="px-4 py-3 font-medium min-w-[200px]">Tên dự án</th>
                  <th className="px-4 py-3 font-medium w-40">Lĩnh vực</th>
                  <th className="px-4 py-3 font-medium min-w-[180px]">Tags</th>
                  <th className="px-4 py-3 font-medium w-24">Trạng thái</th>
                  <th className="px-4 py-3 font-medium w-28">Link</th>
                  <th className="px-4 py-3 font-medium w-28 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    onEdit={() => openEdit(project)}
                    onDelete={() => handleDelete(project.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-4 py-3 text-xs text-text-secondary border-t border-white/5">
            Hiển thị {filteredProjects.length} / {projects.length} dự án
          </p>
        </AdminCard>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, active, onClick }) {
  const clickable = Boolean(onClick);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!clickable}
      className={`p-4 rounded-xl border text-left transition-all ${
        active
          ? 'border-primary/50 bg-primary/10'
          : 'border-white/5 bg-surface/30 hover:border-white/15'
      } ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="flex items-center gap-2 text-text-secondary mb-1">
        <Icon icon={icon} className="text-base" />
        <span className="text-xs truncate">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </button>
  );
}

function FilterPill({ label, icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
        active
          ? 'border-primary/50 bg-primary/15 text-white'
          : 'border-white/10 text-text-secondary hover:border-white/20'
      }`}
    >
      {icon && <Icon icon={icon} />}
      {label}
    </button>
  );
}

function ProjectRow({ project, onEdit, onDelete }) {
  const category = getCategoryMeta(project.category);
  const tags = project.tags?.length
    ? project.tags
    : (project.sub_title ?? '').split('/').map((t) => t.trim()).filter(Boolean);
  const hasLink = project.product_link && project.product_link !== '#';

  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-3 text-text-secondary">{project.sort_order}</td>
      <td className="px-4 py-3">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt=""
            className="w-12 h-9 object-cover rounded-md border border-white/10"
          />
        ) : (
          <div className="w-12 h-9 rounded-md border border-white/10 bg-bg-deep/50 flex items-center justify-center">
            <Icon icon="mdi:image-off-outline" className="text-lg text-text-secondary/40" />
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        <p className="font-medium line-clamp-1">{project.title}</p>
        <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">{project.description}</p>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] border whitespace-nowrap ${category.badgeClass}`}>
          <Icon icon={category.icon} className="text-sm shrink-0" />
          {category.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-text-secondary">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] text-text-secondary">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex px-2 py-0.5 rounded-full text-[11px] border ${
            project.is_active
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}
        >
          {project.is_active ? 'Hiện' : 'Ẩn'}
        </span>
      </td>
      <td className="px-4 py-3">
        {hasLink ? (
          <a
            href={project.product_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
          >
            <Icon icon="mdi:open-in-new" />
            Demo
          </a>
        ) : (
          <span className="text-xs text-text-secondary">—</span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="px-3 py-1 text-xs rounded-lg border border-white/10 hover:border-primary/40"
          >
            Sửa
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="px-3 py-1 text-xs rounded-lg border border-red-400/30 text-red-400 hover:bg-red-400/10"
          >
            Xóa
          </button>
        </div>
      </td>
    </tr>
  );
}
