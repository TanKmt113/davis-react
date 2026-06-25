import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { Icon } from '@iconify/react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: 'home', label: 'Trang chủ' },
    { to: 'about', label: 'Giới thiệu' },
    { to: 'skills', label: 'Kỹ năng' },
    { to: 'services', label: 'Dịch vụ' },
    { to: 'portfolio', label: 'Dự án' },
    { to: 'contact', label: 'Liên hệ' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 border-b border-white/5 shadow-2xl transition-all duration-500 bg-surface/60 backdrop-blur-xl ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className="flex justify-between items-center px-6 md:px-8 max-w-[1200px] mx-auto w-full">
        {/* Logo */}
        <ScrollLink 
          to="home" 
          spy={true} 
          smooth={true} 
          offset={-80} 
          duration={500} 
          className="font-headline-md text-headline-md font-bold tracking-tighter text-text-primary hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          TANDEV
        </ScrollLink>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, idx) => (
            <ScrollLink
              key={idx}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              activeClass="text-primary font-semibold"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </ScrollLink>
          ))}
        </div>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="hidden sm:inline-flex bg-gradient-to-r from-accent-purple to-primary text-text-primary px-6 py-2 rounded-full font-mono-label text-mono-label hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] cursor-pointer"
          >
            Hợp tác
          </ScrollLink>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-primary hover:text-primary transition-colors"
          >
            <Icon icon={mobileMenuOpen ? "material-symbols:close-rounded" : "material-symbols:menu-rounded"} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Links Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-white/5 py-6 px-8 flex flex-col gap-4 shadow-xl z-50">
          {navLinks.map((link, idx) => (
            <ScrollLink
              key={idx}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={() => setMobileMenuOpen(false)}
              activeClass="text-primary font-semibold pl-2 border-l-2 border-primary"
              className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </ScrollLink>
          ))}
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center bg-gradient-to-r from-accent-purple to-primary text-text-primary px-6 py-2.5 rounded-full font-mono-label text-mono-label mt-2"
          >
            Hợp tác
          </ScrollLink>
        </div>
      )}
    </nav>
  );
};

export default Header;
