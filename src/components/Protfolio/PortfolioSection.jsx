import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { PROJECT_CATEGORIES, resolveProjectMeta } from '../../constants/projectCategories';
import { usePortfolioReveal } from '../../hooks/usePortfolioReveal';

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
      <div className="portfolio-filters-inner mx-auto flex max-w-full flex-wrap items-center justify-center gap-2">
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
      className={`portfolio-filter-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${
        active
          ? 'border-primary/50 bg-primary/15 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]'
          : 'border-white/10 bg-surface/30 text-text-secondary hover:border-white/25 hover:text-text-primary'
      }`}
    >
      {icon && <Icon icon={icon} className="text-sm" />}
      <span>{label}</span>
      {count > 0 && (
        <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] ${active ? 'bg-white/15' : badgeClass ?? 'bg-white/5'}`}>
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
        className="w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-white/10 bg-surface p-6 max-h-[85vh] overflow-y-auto"
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
            className="shrink-0 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary"
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
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs uppercase font-bold tracking-wider"
            >
              <Icon icon="material-symbols:visibility-outline" className="mr-1.5 text-base" />
              Xem demo
            </a>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 text-text-secondary hover:text-primary text-xs uppercase font-bold tracking-wider"
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

function ProjectCard({ item }) {
  const [showDetail, setShowDetail] = useState(false);

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
        className="portfolio-card w-full glass-card rounded-2xl overflow-hidden border border-white/5 bg-surface/30 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_16px_32px_rgba(59,130,246,0.12)] relative group h-[360px] max-md:cursor-pointer active:max-md:scale-[0.99]"
      >
      <div className="absolute inset-0 bg-bg-surface overflow-hidden">
        <img
          alt={item.title}
          src={item.imgLink}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/30 to-transparent opacity-90" />
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-md ${item.categoryMeta.badgeClass}`}
        >
          <Icon icon={item.categoryMeta.icon} className="text-sm" />
          {item.categoryMeta.label}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 translate-y-[calc(100%-88px)] md:group-hover:translate-y-0 transition-transform duration-500 ease-out bg-surface/95 backdrop-blur-xl border-t border-white/5 pt-4 pb-5 px-5 z-20 flex flex-col justify-between h-[280px]">
        <div>
          <h3 className="font-headline-md text-base md:text-lg text-text-primary font-bold line-clamp-1">
            {item.title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-primary/5 text-primary font-mono-label text-[10px] border border-primary/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-75 mt-3 pt-3 border-t border-white/5">
          <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 mb-3">
            {item.description}
          </p>
          <div className="flex gap-2">
            {item.productLink && item.productLink !== '#' ? (
              <a
                href={item.productLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-[10px] uppercase font-bold tracking-wider"
              >
                <Icon icon="material-symbols:visibility-outline" className="mr-1 text-sm" />
                Demo
              </a>
            ) : null}
            <button
              type="button"
              onClick={openDetail}
              className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 text-text-secondary hover:text-primary text-[10px] uppercase font-bold tracking-wider"
            >
              <Icon icon="material-symbols:info-outline" className="mr-1 text-sm" />
              Chi tiết
            </button>
          </div>
        </div>

        <p className="md:hidden text-[10px] text-primary/80 text-center uppercase tracking-wider font-semibold">
          Chạm để xem chi tiết
        </p>
      </div>
    </article>

      {showDetail ? <ProjectDetailModal item={item} onClose={() => setShowDetail(false)} /> : null}
    </>
  );
}

ProjectCard.propTypes = {
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

  const sectionRef = usePortfolioReveal(filteredItems, isLoading);

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-24 bg-transparent w-full z-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] top-[20%] left-[-10%]" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[120px] bottom-[20%] right-[-10%]" />
      </div>

      <div className="max-w-container-max mx-auto w-full px-6 relative z-10">
        <div className="portfolio-heading">
          <SectionHeading
            title="Dự Án Đã Thực Hiện"
            subtitle="Một số dự án website, e-commerce và tích hợp hệ thống đã triển khai cho khách hàng doanh nghiệp."
            useAos={false}
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
            <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ProjectCard key={`${item.title}-${item.category}`} item={item} />
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
                  className="mt-4 px-4 py-2 rounded-full border border-white/10 text-sm hover:border-primary/40"
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
