import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { PROJECT_CATEGORIES, resolveProjectMeta } from '../../constants/projectCategories';
import { syncWow } from '../../hooks/useWow';
import { wowProps } from '../../utils/wowProps';

const FALLBACK_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDQzi7yqOPjO83tXhmVb1EWJ1fSIdUIi-X3Vv8gTXS0zfBU1YQj9ZhzD5LreJqOrV7uY0xirxskzPWu3o2E5LUCRAaqAacQqh6qpsCMU9umHIKzrF52wzAqbc4Mb2r74m_UtB2JzGNp9IyLgzh5f0R5QBEZcdrgaGMJP4gRzMCZK0EPEj9hCQ-LYZo1g3IDjDkMTJTCUe7BSvVr688Es3PmxrRljkQ4FoCYkf_QMGjHRpmhHT6rmAUn-8NASyhlwey1wkTrGg6pUxp0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA5zd10E_01bsaPEF26VHhPdZzzIjVFfZW7yCNEN_Cnejh9uv-w-wDfdRZmtwrgB_dgKvW6yNpwLjJ8Lt9LzIKGybDIF347QmQld8_VQ2Ux8zdoapLiUipxCuEbz75gIaqOlzu37gc-v3ehnnM1QLbthVd_ggQO4PkTbyAQ3RpaPy3F9QUbRxfhotP7v7hPo0n6CDssn3hplw_1YPM1rzkTUeZHZJo6ihdegGDbgIIZh47Ljy9Q5C30sqtt_eLO28tJ8XdVWWBoOCcS',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuOkJVzwUXJSs838v0_VY-sbzvNRoXD7EI3pdE2bZX96ZVZK5Lq-CIV1wLo9Fv5iV3o5SlGKK5G2bwkk8KhqxL0-EUrym9XPVujkt2KAFpGCOmoI-_4dI4nr_WFnN1B25wzOzVx5c2WPBCbNQyuTkvT9aHoBahKxB90Bep6u-Lib31ebokTXspk0Shc6Xx_LEVcY3TLlH06KDjc7ot5mkt6mKfb3DIrEuzp4bgf5YaB1pUzbszViEctQjS10Iia_Sx76vfmc-cPsZVs',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
];

function CategoryFilter({ active, onChange, counts }) {
  return (
    <nav className="mt-8 w-full portfolio-filters" aria-label="Lọc dự án theo danh mục">
      <div {...wowProps('portfolio-filters-inner mx-auto flex max-w-full flex-wrap items-center justify-center gap-2', 'fadeInUp', { delay: 200 })}>
        <FilterPill
          active={active === 'all'}
          onClick={() => onChange('all')}
          label="Tất cả"
          count={counts.all}
        />
        {PROJECT_CATEGORIES.map((cat) => (
          <FilterPill
            key={cat.id}
            active={active === cat.id}
            onClick={() => onChange(cat.id)}
            label={cat.label}
            icon={cat.icon}
            count={counts[cat.id] ?? 0}
            badgeClass={cat.badgeClass}
          />
        ))}
      </div>
    </nav>
  );
}

CategoryFilter.propTypes = {
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  counts: PropTypes.object.isRequired,
};

function FilterPill({ label, icon, count, active, onClick, badgeClass }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`portfolio-filter-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
        active
          ? 'border-primary/40 bg-gradient-to-r from-accent-purple to-primary text-stone-900 shadow-[0_8px_24px_rgba(249,115,22,0.25)] scale-105'
          : 'border-border-slate bg-white text-text-secondary hover:border-primary/35 hover:text-primary hover:shadow-[0_4px_16px_rgba(249,115,22,0.1)]'
      }`}
    >
      {icon && <Icon icon={icon} className="text-sm" />}
      <span>{label}</span>
      {count > 0 && (
        <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] ${active ? 'bg-white/80 text-orange-800' : badgeClass ?? 'bg-orange-50 text-orange-700'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

FilterPill.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  count: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  badgeClass: PropTypes.string,
};

function ProjectDetailModal({ item, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-border-slate bg-surface p-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${item.categoryMeta.badgeClass}`}
            >
              <Icon icon={item.categoryMeta.icon} className="text-sm" />
              {item.categoryMeta.label}
            </span>
            <h3 id="project-detail-title" className="font-headline-md text-xl text-text-primary font-bold mt-3">
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full border border-border-slate flex items-center justify-center text-text-secondary hover:text-text-primary"
            aria-label="Đóng"
          >
            <Icon icon="material-symbols:close-rounded" className="text-xl" />
          </button>
        </div>

        {item.imgLink ? (
          <img
            src={item.imgLink}
            alt={item.title}
            className="w-full h-44 object-cover rounded-xl mb-4"
          />
        ) : null}

        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-primary/5 text-primary font-mono-label text-[10px] border border-primary/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line mb-6">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.productLink && item.productLink !== '#' ? (
            <a
              href={item.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent-purple to-primary text-stone-900 text-xs uppercase font-bold tracking-wider"
            >
              <Icon icon="material-symbols:visibility-outline" className="mr-1.5 text-base" />
              Xem demo
            </a>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 rounded-full border border-border-slate text-text-secondary hover:text-primary text-xs uppercase font-bold tracking-wider"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

ProjectDetailModal.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

function isMobileViewport() {
  return window.matchMedia('(max-width: 767px)').matches;
}

function ProjectCard({ item, index, featured = false }) {
  const [showDetail, setShowDetail] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const openDetail = (event) => {
    event?.stopPropagation();
    setShowDetail(true);
  };

  const handleCardClick = () => {
    if (isMobileViewport()) {
      setShowDetail(true);
    }
  };

  return (
    <>
      <article
        onClick={handleCardClick}
        {...wowProps(
          `portfolio-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-slate bg-white shadow-[0_8px_30px_rgba(249,115,22,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/35 hover:shadow-[0_24px_48px_rgba(249,115,22,0.16)] max-md:cursor-pointer active:max-md:scale-[0.99] ${featured ? 'lg:col-span-2' : ''}`,
          'fadeInUp',
          { delay: 100 + (index % 6) * 80 },
        )}
      >
        <div className={`relative overflow-hidden ${featured ? 'aspect-[21/9] sm:aspect-[2.2/1]' : 'aspect-[16/10]'}`}>
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-orange-50 to-orange-100" />
          )}
          <img
            alt={item.title}
            src={item.imgLink}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/55 via-stone-900/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
          <span
            className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md ${item.categoryMeta.badgeClass}`}
          >
            <Icon icon={item.categoryMeta.icon} className="text-sm" />
            {item.categoryMeta.label}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold text-orange-700 shadow-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
          {featured && (
            <span className="absolute bottom-3 left-3 rounded-full bg-gradient-to-r from-accent-purple to-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-900 shadow-md">
              Dự án nổi bật
            </span>
          )}
        </div>

        <div className="relative flex flex-1 flex-col p-5 md:p-6">
          <div className="absolute left-5 top-0 h-1 w-12 -translate-y-1/2 rounded-full bg-gradient-to-r from-accent-purple to-primary md:left-6" />

          <h3 className={`font-bold text-text-primary line-clamp-2 ${featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
            {item.title}
          </h3>

          <p className={`mt-2 flex-1 text-text-secondary leading-relaxed ${featured ? 'line-clamp-3 text-sm' : 'line-clamp-2 text-xs md:text-sm'}`}>
            {item.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.slice(0, featured ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/15 bg-orange-50 px-2.5 py-0.5 font-mono-label text-[10px] text-orange-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-border-slate pt-4">
            {item.productLink && item.productLink !== '#' ? (
              <a
                href={item.productLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-purple to-primary px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-900 transition-transform hover:scale-105"
              >
                <Icon icon="material-symbols:open-in-new-rounded" className="mr-1.5 text-sm" />
                Xem demo
              </a>
            ) : null}
            <button
              type="button"
              onClick={openDetail}
              className="inline-flex items-center rounded-full border border-border-slate px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-text-secondary transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Icon icon="material-symbols:arrow-outward-rounded" className="mr-1.5 text-sm" />
              Chi tiết
            </button>
          </div>

          <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-wider text-primary/70 md:hidden">
            Chạm để xem chi tiết
          </p>
        </div>
      </article>

      {showDetail ? <ProjectDetailModal item={item} onClose={() => setShowDetail(false)} /> : null}
    </>
  );
}

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  featured: PropTypes.bool,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgLink: PropTypes.string,
    productLink: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    categoryMeta: PropTypes.object.isRequired,
  }).isRequired,
};

const PortfolioSection = ({ portfolioItems, isLoading = false, fetchError = null }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const processedItems = useMemo(
    () =>
      portfolioItems.map((item, idx) => {
        const { category, tags, categoryMeta } = resolveProjectMeta(item);
        return {
          ...item,
          category,
          tags,
          categoryMeta,
          imgLink: item.imgLink || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
        };
      }),
    [portfolioItems],
  );

  const categoryCounts = useMemo(() => {
    const counts = { all: processedItems.length };
    PROJECT_CATEGORIES.forEach((cat) => {
      counts[cat.id] = processedItems.filter((p) => p.category === cat.id).length;
    });
    return counts;
  }, [processedItems]);

  const filteredItems = useMemo(
    () =>
      activeCategory === 'all'
        ? processedItems
        : processedItems.filter((item) => item.category === activeCategory),
    [processedItems, activeCategory],
  );

  useEffect(() => {
    if (!isLoading && filteredItems.length > 0) {
      syncWow();
    }
  }, [filteredItems, isLoading]);

  return (
    <section id="portfolio" className="relative py-24 w-full z-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-orange-50/80 via-white to-white" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[520px] h-[520px] rounded-full bg-primary/10 blur-[130px] top-[8%] left-[-12%]" />
        <div className="absolute w-[480px] h-[480px] rounded-full bg-accent-purple/40 blur-[120px] bottom-[5%] right-[-10%]" />
      </div>

      <div className="max-w-container-max mx-auto w-full px-6 relative z-10">
        <div className="portfolio-heading">
          <SectionHeading
            title="Dự Án Đã Thực Hiện"
            subtitle="Một số dự án website, e-commerce và tích hợp hệ thống đã triển khai cho khách hàng doanh nghiệp."
          />
        </div>
        <CategoryFilter
          active={activeCategory}
          onChange={setActiveCategory}
          counts={categoryCounts}
        />

        <div className="mt-10">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredItems.map((item, index) => (
                <ProjectCard
                  key={`${item.title}-${item.category}`}
                  item={item}
                  index={index}
                  featured={index === 0 && filteredItems.length > 2}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Icon icon="material-symbols:search-off-rounded" className="text-6xl text-text-secondary/40 mx-auto mb-4" />
              <p className="font-body-lg text-body-lg text-text-secondary">
                {fetchError
                  ? 'Không thể tải dự án từ Supabase. Vui lòng kiểm tra cấu hình.'
                  : 'Không có dự án nào trong lĩnh vực này.'}
              </p>
              {activeCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className="mt-4 px-4 py-2 rounded-full border border-border-slate text-sm hover:border-primary/40"
                >
                  Xem tất cả dự án
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

PortfolioSection.propTypes = {
  portfolioItems: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  fetchError: PropTypes.string,
};

export default PortfolioSection;
