import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';

const ResumeSection = ({ data }) => {
  const { educationTitle, education, experienceTitle, experience } = data;

  return (
    <section id="resume" className="relative py-24 bg-transparent overflow-hidden z-10">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[450px] h-[450px] rounded-full bg-primary/5 blur-[120px] top-[30%] left-[20%]"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px] bottom-[20%] right-[20%]"></div>
      </div>

      <div className="max-w-container-max mx-auto w-full px-6 relative z-10">
        <div className="mb-16 text-center">
          <SectionHeading title="Hồ Sơ & Năng Lực" />
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-text-primary mb-4 bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
            Kinh Nghiệm & Học Vấn
          </h2>
          <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Hành trình phát triển chuyên môn, năng lực quản lý dự án và các cột mốc trong công việc của tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-10 pb-3 border-b border-white/5">
              <div className="p-2.5 bg-surface-variant/30 rounded-lg border border-border-slate/50 text-primary flex items-center justify-center">
                <Icon icon="material-symbols:work-outline-rounded" className="text-2xl" />
              </div>
              <h2 className="font-headline-md text-headline-md text-text-primary">{experienceTitle}</h2>
            </div>

            <div className="relative border-l-2 border-border-slate/50 ml-4 pl-8 space-y-12">
              {experience.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Timeline node marker */}
                  <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-primary group-hover:bg-primary transition-all duration-300 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary group-hover:bg-surface"></div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-xl transition-all duration-400 hover:bg-surface/50 hover:border-primary/20 hover:shadow-[0_15px_30px_rgba(59,130,246,0.1)]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="bg-primary/10 text-primary px-3.5 py-1 rounded-full font-mono-label text-mono-label border border-primary/10">
                        {exp.duration}
                      </span>
                      <h4 className="font-label-caps text-label-caps text-accent-purple tracking-wider uppercase">{exp.subTitle}</h4>
                    </div>

                    <h3 className="font-headline-md text-headline-md text-text-primary mb-3 tracking-tight">{exp.title}</h3>
                    <p className="font-body-base text-body-base text-text-secondary leading-relaxed mb-4">
                      {exp.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies (rendered in Education section of schema) */}
          <div>
            <div className="flex items-center gap-3 mb-10 pb-3 border-b border-white/5">
              <div className="p-2.5 bg-surface-variant/30 rounded-lg border border-border-slate/50 text-accent-purple flex items-center justify-center">
                <Icon icon="material-symbols:star-outline" className="text-2xl" />
              </div>
              <h2 className="font-headline-md text-headline-md text-text-primary">{educationTitle}</h2>
            </div>

            <div className="relative border-l-2 border-border-slate/50 ml-4 pl-8 space-y-12">
              {education.map((edu, index) => (
                <div key={index} className="relative group">
                  {/* Timeline node marker */}
                  <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-accent-purple group-hover:bg-accent-purple transition-all duration-300 flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-purple group-hover:bg-surface"></div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-xl transition-all duration-400 hover:bg-surface/50 hover:border-accent-purple/20 hover:shadow-[0_15px_30px_rgba(139,92,246,0.1)]">
                    <h3 className="font-headline-md text-headline-md text-text-primary mb-4 tracking-tight">{edu.title}</h3>
                    <div 
                      className="font-body-base text-body-base text-text-secondary leading-relaxed resume-list-container"
                      dangerouslySetInnerHTML={{ __html: edu.text }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ResumeSection.propTypes = {
  data: PropTypes.object,
};

export default ResumeSection;
