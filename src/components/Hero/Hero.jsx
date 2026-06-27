import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useHeroEntrance } from '../../hooks/useHeroEntrance';

const Hero = ({ data }) => {
  const { title, designation, imgLink, description, tags } = data;
  const [typedText, setTypedText] = useState('');
  const containerRef = useHeroEntrance();
  
  useEffect(() => {
    const textToType = (designation || 'Tư vấn & Triển khai Web · E-commerce').normalize('NFC');
    const chars = [...textToType];
    let index = 0;
    setTypedText('');

    const timer = setInterval(() => {
      index += 1;
      setTypedText(chars.slice(0, index).join(''));
      if (index >= chars.length) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [designation]);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent text-text-primary px-4 pt-28 md:pt-32 pb-20 z-10">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="hero-blob absolute w-[500px] h-[500px] rounded-full bg-primary/20 blur-[80px] md:blur-[120px] top-[-100px] left-[-100px] animate-float-1" />
        <div className="hero-blob absolute w-[400px] h-[400px] rounded-full bg-accent-purple/20 blur-[80px] md:blur-[120px] bottom-[100px] right-[-50px] animate-float-2" />
        <div className="hero-blob absolute w-[300px] h-[300px] rounded-full bg-primary-container/15 blur-[80px] md:blur-[100px] top-[30%] left-[40%] animate-float-3" />
      </div>

      <div className="hero-card glass-card rounded-2xl p-8 md:p-16 max-w-4xl w-full text-center relative overflow-hidden group z-10">
        {/* Subtle internal glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar/Profile Image */}
          <div className="hero-avatar hero-reveal w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-border-slate mb-8 overflow-hidden relative group-hover:border-primary/50 transition-colors duration-500">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
              style={{ backgroundImage: `url(${imgLink || "/images/section/av2.jpg"})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/20 to-primary/20 mix-blend-overlay"></div>
          </div>

          <h1 className="hero-title hero-reveal font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero text-text-primary mb-4 tracking-tighter">
            {title}
          </h1>

          <h2 className="hero-designation hero-reveal font-headline-md text-headline-md text-primary mb-6 h-[40px] flex items-center justify-center">
            <span className="after:content-['|'] after:animate-blink after:ml-0.5">
              {typedText}
            </span>
          </h2>

          <p className="hero-desc hero-reveal font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto mb-10">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <ScrollLink 
              to="portfolio" 
              smooth={true} 
              duration={500} 
              className="hero-cta hero-reveal bg-gradient-to-r from-accent-purple to-primary text-text-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-2 group cursor-pointer"
            >
              Xem dự án đã triển khai
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </ScrollLink>
            <ScrollLink 
              to="contact" 
              smooth={true} 
              duration={500} 
              className="hero-cta hero-reveal border border-border-slate hover:border-primary bg-transparent text-primary hover:bg-primary hover:text-text-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Trao đổi dự án
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </ScrollLink>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {(tags ?? []).map((tag, i) => (
              <span key={i} className="hero-tag hero-reveal bg-primary/10 text-primary px-4 py-1.5 rounded-full font-mono-label text-mono-label">{tag}</span>
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  data: PropTypes.object,
};

export default Hero;
