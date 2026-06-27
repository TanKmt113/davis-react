import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';

const Skill = ({ data }) => {
  const { title, text, categories = [] } = data;

  return (
    <section id="skills" className="relative py-24 bg-transparent overflow-hidden z-10">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent-purple/10 blur-[100px] top-[10%] right-[-5%]"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-primary-container/10 blur-[100px] bottom-[10%] left-[-5%]"></div>
      </div>

      <div className="max-w-container-max mx-auto w-full px-6 relative z-10">
        <div className="mb-16 text-center">
          <SectionHeading title="Kỹ năng chuyên môn" />
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-text-primary mb-4 bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
            {title}
          </h2>
          <p className="font-body-lg text-body-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {text}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-2xl p-8 border border-white/5 bg-surface/30 backdrop-blur-xl transition-all duration-400 hover:-translate-y-2 hover:bg-surface/50 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] relative overflow-hidden group h-full flex flex-col"
            >
              {/* Top gradient border overlay on card hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="p-3 bg-surface-variant/50 rounded-xl border border-border-slate/50 flex items-center justify-center mb-4">
                  <Icon icon={cat.icon} className={`text-2xl ${cat.iconColor}`} />
                </div>
                <h3 className="font-headline-md text-headline-md text-text-primary font-semibold">{cat.title}</h3>
              </div>

              <p className="font-body-base text-body-base text-text-secondary mb-6 leading-relaxed text-center flex-grow">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-2 justify-center mt-auto">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="bg-primary/5 hover:bg-primary/20 text-primary hover:text-text-primary px-3.5 py-1.5 rounded-full font-mono-label text-mono-label border border-primary/10 transition-all duration-300 cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Skill.propTypes = {
  data: PropTypes.object,
};

export default Skill;
