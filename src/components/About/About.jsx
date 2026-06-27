import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';

const About = ({ data }) => {
  const { imgLink, title, subtitle, text, details, cvPdf, tags, stats, experienceBadge } = data;

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
            className="lg:col-span-7 glass-card rounded-2xl p-8 md:p-10 border border-white/5 bg-surface/30 backdrop-blur-xl relative group overflow-hidden flex flex-col justify-between"
            data-aos="fade-right"
            data-aos-duration="800"
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
            className="lg:col-span-5 glass-card rounded-2xl overflow-hidden border border-white/5 bg-surface/30 backdrop-blur-xl relative group flex items-center justify-center p-5"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src={imgLink || "/images/section/ava1.jpg"} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/35 to-primary/20 mix-blend-overlay"></div>
              
              <div className="absolute bottom-4 left-4 bg-bg-deep/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl">
                <p className="font-mono-label text-[10px] text-primary uppercase tracking-widest font-bold">{experienceBadge?.label ?? 'Kinh nghiệm'}</p>
                <p className="font-label-caps text-xs text-text-primary font-bold mt-0.5">{experienceBadge?.value ?? '3+ Năm Thực Chiến'}</p>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Details Card (Col span 5) */}
          <div 
            className="lg:col-span-5 glass-card rounded-2xl p-8 border border-white/5 bg-surface/30 backdrop-blur-xl relative group flex flex-col justify-between"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div>
              <h4 className="font-headline-md text-xl text-text-primary mb-6 tracking-tight font-semibold">Thông tin liên hệ</h4>
              <div className="space-y-5">
                {details.map((item, index) => (
                  <div key={index} className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-surface-variant/30 border border-border-slate/50 flex items-center justify-center text-primary shrink-0">
                      <Icon 
                        icon={
                          item.title.toLowerCase().includes('thoại') ? 'material-symbols:phone-android-outline-rounded' :
                          item.title.toLowerCase().includes('email') ? 'material-symbols:mail-outline' :
                          item.title.toLowerCase().includes('phạm vi') ? 'material-symbols:handshake-outline' :
                          item.title.toLowerCase().includes('chỉ') ? 'material-symbols:location-on-outline' :
                          'material-symbols:school-outline'
                        } 
                        className="text-lg" 
                      />
                    </div>
                    <div>
                      <p className="font-mono-label text-[10px] text-text-secondary/60 uppercase tracking-widest font-medium">{item.title}</p>
                      <p className="font-body-base text-sm text-text-primary font-medium mt-0.5">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <a 
                href={cvPdf} 
                download 
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-full font-label-caps text-label-caps text-text-primary uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] gap-2 cursor-pointer text-xs"
              >
                Tải hồ sơ năng lực
                <Icon icon="material-symbols:download-rounded" className="text-base" />
              </a>
            </div>
          </div>

          {/* Bento Card 4: Stats Card (Col span 7) */}
          <div 
            className="lg:col-span-7 glass-card rounded-2xl p-8 border border-white/5 bg-surface/30 backdrop-blur-xl relative group"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h4 className="font-headline-md text-xl text-text-primary mb-8 tracking-tight font-semibold">Cam kết & Kết quả</h4>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {(stats ?? []).map((stat, i) => (
                <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative overflow-hidden">
                  <span className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-purple font-headline-lg">{stat.value}</span>
                  <p className="font-label-caps text-xs text-text-primary mt-2 font-bold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[11px] text-text-secondary mt-1 leading-normal">{stat.desc}</p>
                </div>
              ))}
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
