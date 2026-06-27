import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';

const Iconbox = ({ data }) => {
  const { services } = data;

  const serviceIcons = [
    "material-symbols:design-services-outline",
    "material-symbols:shopping-bag-outline",
    "material-symbols:bolt-outline",
    "material-symbols:dashboard-outline",
  ];

  return (
    <section id="services" className="relative py-24 bg-transparent overflow-hidden z-10">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] top-[15%] right-[-5%]"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px] bottom-[15%] left-[-5%]"></div>
      </div>

      <div className="max-w-container-max mx-auto w-full px-6 relative z-10">
        <div className="mb-16 text-center">
          <SectionHeading title="Dịch Vụ & Giải Pháp" />
          <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">
            Bằng các kinh nghiệm thực chiến kể trên, tôi tự tin triển khai đa dạng các loại dự án trong ngành CNTT, đảm bảo tiến độ và chất lượng sản phẩm cao nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((element, index) => (
            <div 
              className="glass-card rounded-2xl p-8 border border-white/5 bg-surface/30 backdrop-blur-xl transition-all duration-400 hover:-translate-y-2 hover:bg-surface/50 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] relative overflow-hidden group flex flex-col justify-between"
              key={index}
              data-aos={element.effect ? element.effect : "zoom-out-up"}
              data-aos-duration={element.duration ? element.duration : "800"}
              data-aos-delay={element.delay ? element.delay : "200"}
            >
              {/* Top accent border on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

              <div>
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-surface-variant/50 border border-border-slate/50 flex items-center justify-center text-primary mb-6 transition-all duration-300 group-hover:scale-110">
                  <Icon icon={serviceIcons[index % serviceIcons.length]} className="text-2xl" />
                </div>
                
                <h3 className="font-headline-md text-headline-md text-text-primary mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {element.title}
                </h3>
                
                <p className="font-body-base text-body-base text-text-secondary leading-relaxed mb-6">
                  {element.text}
                </p>
              </div>

              <div className="flex items-center gap-1 font-mono-label text-mono-label text-primary uppercase tracking-wider group-hover:underline cursor-pointer">
                Tìm hiểu thêm
                <Icon icon="material-symbols:arrow-right-alt-rounded" className="text-lg transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Iconbox.propTypes = {
  data: PropTypes.object,
};

export default Iconbox;
