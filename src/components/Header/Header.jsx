import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Icon } from '@iconify/react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { to: 'home', label: 'Trang chủ' },
    { to: 'about', label: 'Giới thiệu' },
    { to: 'skills', label: 'Kỹ năng' },
    { to: 'services', label: 'Dịch vụ' },
    { to: 'portfolio', label: 'Dự án' },
    { to: 'contact', label: 'Liên hệ' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 border-b border-white/5 shadow-2xl transition-all duration-500 bg-surface/60 backdrop-blur-xl ${
          isScrolled ? 'py-3' : 'py-5'
        } ${mobileMenuOpen ? 'md:bg-surface/60 bg-bg-deep' : ''}`}
      >
        <div className="flex justify-between items-center px-6 md:px-8 max-w-[1200px] mx-auto w-full">
          <ScrollLink
            to="home"
            spy
            smooth
            offset={-80}
            duration={500}
            onClick={closeMobileMenu}
            className="font-headline-md text-headline-md font-bold tracking-tighter text-text-primary hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            TANDEV
          </ScrollLink>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                spy
                smooth
                offset={-80}
                duration={500}
                activeClass="text-primary font-semibold"
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                {link.label}
              </ScrollLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ScrollLink
              to="contact"
              smooth
              duration={500}
              className="hidden sm:inline-flex bg-gradient-to-r from-accent-purple to-primary text-text-primary px-6 py-2 rounded-full font-mono-label text-mono-label hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] cursor-pointer"
            >
              Hợp tác
            </ScrollLink>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden text-text-primary hover:text-primary transition-colors p-1"
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={mobileMenuOpen}
            >
              <Icon
                icon={mobileMenuOpen ? 'material-symbols:close-rounded' : 'material-symbols:menu-rounded'}
                className="text-2xl"
              />
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[45] bg-bg-deep">
          <div className="flex flex-col h-full pt-[72px] pb-8 px-6 overflow-y-auto">
            <nav className="flex flex-col gap-1" aria-label="Menu chính">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  spy
                  smooth
                  offset={-80}
                  duration={500}
                  onClick={closeMobileMenu}
                  activeClass="!text-primary font-semibold bg-primary/10 border-primary/30"
                  className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer rounded-xl px-4 py-3.5 border border-transparent hover:bg-white/5"
                >
                  {link.label}
                </ScrollLink>
              ))}
            </nav>

            <ScrollLink
              to="contact"
              smooth
              duration={500}
              onClick={closeMobileMenu}
              className="mt-6 w-full text-center bg-gradient-to-r from-accent-purple to-primary text-text-primary px-6 py-3 rounded-full font-mono-label text-mono-label shadow-[0_0_20px_rgba(59,130,246,0.25)]"
            >
              Hợp tác
            </ScrollLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
