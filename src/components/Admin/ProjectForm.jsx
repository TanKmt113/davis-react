import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ImageUpload from './ImageUpload';
import { AdminCard, FormField, FormTextarea, SaveButton } from './AdminUI';
import {
  PROJECT_CATEGORIES,
  TAG_SUGGESTIONS,
  tagsToSubTitle,
} from '../../constants/projectCategories';

const emptyForm = {
  title: '',
  sub_title: '',
  description: '',
  product_link: '#',
  image_url: '',
  sort_order: 0,
  is_active: true,
  category: 'ecommerce',
  tags: [],
  effect: 'fade-up',
  duration: '500',
  delay: '300',
};

/** @param {Record<string, unknown> | null | undefined} initial */
function normalizeInitial(initial) {
  if (!initial) return emptyForm;
  const tags = Array.isArray(initial.tags)
    ? initial.tags
    : (initial.sub_title ?? '').split('/').map((t) => t.trim()).filter(Boolean);

  return {
    ...emptyForm,
    ...initial,
    tags,
    category: initial.category ?? 'ecommerce',
  };
}

export default function ProjectForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(() => normalizeInitial(initial));
  const [tagInput, setTagInput] = useState('');

  const suggestions = useMemo(
    () => TAG_SUGGESTIONS[form.category] ?? [],
    [form.category],
  );

  const unusedSuggestions = suggestions.filter(
    (tag) => !form.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );

  const patch = (updates) => setForm((prev) => ({ ...prev, ...updates }));

  const addTag = (raw) => {
    const tag = raw.trim();
    if (!tag) return;
    if (form.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) return;
    const tags = [...form.tags, tag];
    patch({ tags, sub_title: tagsToSubTitle(tags) });
    setTagInput('');
  };

  const removeTag = (index) => {
    const tags = form.tags.filter((_, i) => i !== index);
    patch({ tags, sub_title: tagsToSubTitle(tags) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      sub_title: tagsToSubTitle(form.tags) || form.sub_title,
      sort_order: Number(form.sort_order) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <AdminCard title="Thông tin dự án">
          <div className="space-y-4">
            <FormField
              label="Tên dự án"
              value={form.title}
              onChange={(e) => patch({ title: e.target.value })}
              required
            />
            <FormTextarea
              label="Mô tả"
              rows={6}
              value={form.description}
              onChange={(e) => patch({ description: e.target.value })}
              required
            />
            <FormField
              label="Link demo / sản phẩm"
              value={form.product_link}
              onChange={(e) => patch({ product_link: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </AdminCard>

        <AdminCard title="Lĩnh vực & Công nghệ">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-text-secondary">Lĩnh vực</p>
              <div className="grid grid-cols-2 gap-2">
                {PROJECT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => patch({ category: cat.id })}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all ${
                      form.category === cat.id
                        ? 'border-primary/60 bg-primary/10 text-white'
                        : 'border-white/10 bg-bg-deep/30 text-text-secondary hover:border-white/20'
                    }`}
                  >
                    <Icon icon={cat.icon} className="text-lg shrink-0" />
                    <span className="leading-tight">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2 text-text-secondary">Tags / Công nghệ</p>
              <div className="flex flex-wrap gap-2 mb-2 min-h-[32px]">
                {form.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-text-secondary hover:text-red-400"
                      aria-label={`Xóa tag ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(tagInput);
                    }
                  }}
                  placeholder="Nhập tag, Enter để thêm"
                  className="flex-1 px-3 py-2 rounded-xl bg-bg-deep/50 border border-white/10 text-sm focus:border-primary/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => addTag(tagInput)}
                  className="px-3 py-2 rounded-xl border border-white/10 text-sm hover:border-primary/40"
                >
                  Thêm
                </button>
              </div>
              {unusedSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {unusedSuggestions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addTag(tag)}
                      className="px-2 py-0.5 rounded-md text-xs border border-dashed border-white/15 text-text-secondary hover:border-primary/40 hover:text-primary"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AdminCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <AdminCard title="Hình ảnh">
          <ImageUpload
            value={form.image_url ?? ''}
            onChange={(url) => patch({ image_url: url })}
          />
        </AdminCard>

        <AdminCard title="Hiển thị & Animation">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              label="Thứ tự"
              type="number"
              value={form.sort_order}
              onChange={(e) => patch({ sort_order: e.target.value })}
            />
            <FormField
              label="Effect"
              value={form.effect}
              onChange={(e) => patch({ effect: e.target.value })}
            />
            <FormField
              label="Duration (ms)"
              value={form.duration}
              onChange={(e) => patch({ duration: e.target.value })}
            />
            <FormField
              label="Delay (ms)"
              value={form.delay}
              onChange={(e) => patch({ delay: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => patch({ is_active: e.target.checked })}
              className="rounded"
            />
            Hiển thị trên website
          </label>
        </AdminCard>
      </div>

      <div className="flex gap-3">
        <SaveButton loading={submitting} label={initial?.id ? 'Cập nhật dự án' : 'Tạo dự án'} />
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl border border-white/10 text-sm hover:border-primary/40"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}

ProjectForm.propTypes = {
  initial: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};
