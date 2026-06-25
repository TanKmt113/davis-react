import { Icon } from '@iconify/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-12 bg-transparent border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <div className="text-lg font-bold text-text-primary tracking-tight">TANDEV</div>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            © {currentYear} Đỗ Trọng Tấn — Senior Full Stack Developer. Built with precision.
          </p>
        </div>

        <div className="flex gap-5 text-text-secondary">
          <a href="https://github.com/TanKmt113" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-xl">
            <Icon icon="mdi:github" />
          </a>
          <a href="https://www.linkedin.com/in/tan-do-0a754a3b8/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-xl">
            <Icon icon="mdi:linkedin" />
          </a>
          <a href="mailto:dotrongtan113@gmail.com" className="hover:text-primary transition-colors text-xl">
            <Icon icon="material-symbols:mail-outline" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
