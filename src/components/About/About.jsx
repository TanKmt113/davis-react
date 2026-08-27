import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { wowProps } from '../../utils/wowProps';

const About = ({ data }) => {
  const { imgLink, title, subtitle, text, tags, experienceBadge } = data;

  return (
    <section id="about" className="relative py-24 bg-transparent overflow-hidden z-10">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] top-[10%] left-[-5%]"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px] bottom-[10%] right-[-5%]"></div>
      </div>

      <div className="max-w-container-max mx-auto w-full px-6 relative z-10">
        <div className="mb-16 text-center">
          <SectionHeading title="Đối tác công nghệ tin cậy" subtitle="Hiểu nghiệp vụ — triển khai đúng hạn — bàn giao ổn định" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bento Card 1: Intro Card (Col span 7) */}
          <div 
            {...wowProps(
              'lg:col-span-7 glass-card rounded-2xl p-8 md:p-10 border border-border-slate bg-surface/30 backdrop-blur-xl relative group overflow-hidden flex flex-col justify-between',
              'fadeInRight',
            )}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div>
              <span className="font-mono-label text-xs text-primary uppercase tracking-widest font-semibold">Giá trị hợp tác</span>
              <h3 className="font-headline-lg-mobile text-3xl md:text-4xl text-text-primary mt-2 mb-2 tracking-tight font-bold">
                {title}
              </h3>
              <h4 className="font-headline-md text-lg md:text-xl text-primary mb-6 tracking-wide font-medium">
                {subtitle}
              </h4>
              <p className="font-body-base text-base text-text-secondary leading-relaxed">
                {text}
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-2.5">
              {(tags ?? []).map((tag, i) => (
                <span key={i} className="bg-primary/5 border border-primary/10 text-primary px-3.5 py-1.5 rounded-full font-mono-label text-xs">{tag}</span>
              ))}
            </div>
          </div>

          {/* Bento Card 2: Photo Card (Col span 5) */}
          <div 
            {...wowProps(
              'lg:col-span-5 glass-card rounded-2xl overflow-hidden border border-border-slate bg-surface/30 backdrop-blur-xl relative group flex items-center justify-center p-5',
              'fadeInLeft',
              { delay: 150 },
            )}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square rounded-xl overflow-hidden border border-border-slate shadow-2xl">
              <img 
                src={imgLink || "/images/section/ava1.jpg"} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/35 to-primary/20 mix-blend-overlay"></div>
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md border border-border-slate px-4 py-2.5 rounded-xl">
                <p className="font-mono-label text-[10px] text-primary uppercase tracking-widest font-bold">{experienceBadge?.label ?? 'Kinh nghiệm'}</p>
                <p className="font-label-caps text-xs text-text-primary font-bold mt-0.5">{experienceBadge?.value ?? '3+ Năm Thực Chiến'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

About.propTypes = {
  data: PropTypes.object.isRequired,
};

export default About;
