import { useTheme } from '../../context/ThemeContext';
import { Icon } from '@iconify/react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ml-4 shrink-0 
        ${theme === 'light' 
          ? 'bg-black/5 border border-black/10 text-amber-700 hover:bg-amber-700/10 hover:border-amber-700/30' 
          : 'bg-white/10 border border-white/10 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/30'
        }
        md:relative fixed bottom-8 right-5 md:bottom-auto md:right-auto z-[999] md:z-auto shadow-lg md:shadow-none
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
    >
      <Icon 
        icon={theme === 'light' ? "material-symbols:wb-sunny-rounded" : "material-symbols:nightlight-round"} 
        className="text-xl transition-transform duration-500 hover:rotate-12 scale-110" 
      />
    </button>
  );
};

export default ThemeToggle;
