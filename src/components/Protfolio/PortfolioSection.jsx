import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useMemo } from 'react';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -right-4 md:-right-8 z-20 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 hover:bg-surface border border-white/10 hover:border-primary/50 text-text-primary flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-primary/20"
      aria-label="Next slide"
    >
      <Icon icon="material-symbols:arrow-forward-ios-rounded" className="text-base" />
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -left-4 md:-left-8 z-20 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/80 hover:bg-surface border border-white/10 hover:border-primary/50 text-text-primary flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-primary/20"
      aria-label="Previous slide"
    >
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" className="text-base" />
    </button>
  );
};

const PortfolioSection = ({ data }) => {
  const { portfolioItems } = data;

  // Map high-quality design placeholder images to projects based on their index/title
  const projectImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDQzi7yqOPjO83tXhmVb1EWJ1fSIdUIi-X3Vv8gTXS0zfBU1YQj9ZhzD5LreJqOrV7uY0xirxskzPWu3o2E5LUCRAaqAacQqh6qpsCMU9umHIKzrF52wzAqbc4Mb2r74m_UtB2JzGNp9IyLgzh5f0R5QBEZcdrgaGMJP4gRzMCZK0EPEj9hCQ-LYZo1g3IDjDkMTJTCUe7BSvVr688Es3PmxrRljkQ4FoCYkf_QMGjHRpmhHT6rmAUn-8NASyhlwey1wkTrGg6pUxp0", // POS
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA5zd10E_01bsaPEF26VHhPdZzzIjVFfZW7yCNEN_Cnejh9uv-w-wDfdRZmtwrgB_dgKvW6yNpwLjJ8Lt9LzIKGybDIF347QmQld8_VQ2Ux8zdoapLiUipxCuEbz75gIaqOlzu37gc-v3ehnnM1QLbthVd_ggQO4PkTbyAQ3RpaPy3F9QUbRxfhotP7v7hPo0n6CDssn3hplw_1YPM1rzkTUeZHZJo6ihdegGDbgIIZh47Ljy9Q5C30sqtt_eLO28tJ8XdVWWBoOCcS", // MedusaJS E-commerce
    "https://lh3.googleusercontent.com/aida-public/AB6AXuOkJVzwUXJSs838v0_VY-sbzvNRoXD7EI3pdE2bZX96ZVZK5Lq-CIV1wLo9Fv5iV3o5SlGKK5G2bwkk8KhqxL0-EUrym9XPVujkt2KAFpGCOmoI-_4dI4nr_WFnN1B25wzOzVx5c2WPBCbNQyuTkvT9aHoBahKxB90Bep6u-Lib31ebokTXspk0Shc6Xx_LEVcY3TLlH06KDjc7ot5mkt6mKfb3DIrEuzp4bgf5YaB1pUzbszViEctQjS10Iia_Sx76vfmc-cPsZVs", // Integration
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop", // WordPress E-commerce
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop", // Shopify custom
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"  // Haravan
  ];

  const processedItems = useMemo(() => {
    return portfolioItems.map((item, idx) => {
      let category = 'system';
      const sub = item.subTitle.toLowerCase();
      if (sub.includes('e-commerce') || sub.includes('shopify') || sub.includes('haravan') || sub.includes('wordpress')) {
        category = 'ecommerce';
      } else if (sub.includes('tự động hóa') || sub.includes('tích hợp') || sub.includes('n8n')) {
        category = 'automation';
      } else if (sub.includes('pos') || sub.includes('bán lẻ')) {
        category = 'system';
      }

      const tags = item.subTitle.split('/').map(t => t.trim());

      return {
        ...item,
        category,
        tags,
        imgLink: projectImages[idx % projectImages.length]
      };
    });
  }, [portfolioItems]);

  const filteredItems = processedItems;

  const sliderSettings = {
    dots: true,
    infinite: filteredItems.length > 3,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: filteredItems.length > 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: filteredItems.length > 1,
          arrows: false,
        }
      }
    ]
  };

  return (
    <section id="portfolio" className="relative py-24 bg-transparent overflow-hidden w-full z-10">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] top-[20%] left-[-10%]"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[120px] bottom-[20%] right-[-10%]"></div>
      </div>

      {/* Title + Controls container */}
      <div className="max-w-container-max mx-auto w-full px-6 relative z-10">
        <div className="mb-12">
          <SectionHeading 
            title="Dự Án Đã Thực Hiện" 
            subtitle="Danh sách các sản phẩm và giải pháp kỹ thuật tôi đã trực tiếp thiết kế, phát triển và tối ưu hóa trong thực tế." 
          />
        </div>

      </div>

      {/* Projects Slider Container: Full-width spanning */}
      <div className="w-full max-w-[100vw] px-6 md:px-16 relative z-10 overflow-x-visible portfolio-slider">
        {filteredItems.length > 0 ? (
          <Slider {...sliderSettings}>
            {filteredItems.map((item, idx) => (
              <div key={idx} className="pb-8">
                <article 
                  className="glass-card rounded-2xl overflow-hidden border border-white/5 bg-surface/30 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-surface/50 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] relative group h-[420px] cursor-grab active:cursor-grabbing"
                >
                  {/* Image Preview Container (occupies full height) */}
                  <div className="absolute inset-0 bg-bg-surface overflow-hidden">
                    <img 
                      alt={item.title} 
                      src={item.imgLink}
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-110"
                    />
                    {/* Dark gradient overlay so text is readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/20 to-transparent opacity-90"></div>
                  </div>

                  {/* Slide-up Detail Panel */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-[calc(100%-96px)] group-hover:translate-y-0 transition-transform duration-500 ease-out bg-surface/95 backdrop-blur-xl border-t border-white/5 pt-5 pb-6 px-6 z-20 flex flex-col justify-between h-[320px]">
                    {/* Panel Header (Always visible at the bottom initially) */}
                    <div className="h-[60px] flex flex-col justify-center">
                      <span className="font-mono-label text-[10px] text-primary uppercase tracking-widest font-semibold">
                        {item.subTitle}
                      </span>
                      <h3 className="font-headline-md text-lg md:text-xl text-text-primary tracking-tight font-bold line-clamp-1 mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    {/* Sliding Content (revealed on hover) */}
                    <div className="flex flex-col justify-between flex-grow mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      <p className="font-body-base text-xs md:text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4 h-[28px] overflow-hidden">
                          {item.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="px-2.5 py-1 rounded-md bg-primary/5 text-primary font-mono-label text-[10px] border border-primary/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                          {item.productLink && item.productLink !== '#' ? (
                            <a 
                              href={item.productLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-mono-label text-[10px] uppercase font-bold tracking-wider hover:scale-105 transition-transform shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
                            >
                              <Icon icon="material-symbols:visibility-outline" className="mr-1.5 text-base" />
                              Demo
                            </a>
                          ) : null}
                          
                          <button
                            onClick={() => alert(`Dự án: ${item.title}\n\n${item.description}`)}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/10 hover:border-primary/50 text-text-secondary hover:text-primary font-mono-label text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
                          >
                            <Icon icon="material-symbols:info-outline" className="mr-1.5 text-base" />
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center py-20 relative z-10">
            <Icon icon="material-symbols:search-off-rounded" className="text-6xl text-text-secondary/40 mx-auto mb-4" />
            <p className="font-body-lg text-body-lg text-text-secondary">Không tìm thấy dự án nào phù hợp.</p>
          </div>
        )}
      </div>
    </section>
  );
};

PortfolioSection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PortfolioSection;
