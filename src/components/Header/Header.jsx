import { useState } from "react";
import { Menu, X, Sun, Moon, FileText, BarChart3, Target, CheckCircle, MessageSquare, Info } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const menuItems = [
    { name: 'Home', href: '/', icon: Info },
    { name: 'Resume Analyzer', href: '/analyzer', icon: FileText },
    { name: 'Job Matching', href: '/job-matching', icon: Target },
    { name: 'ATS Checker', href: '/ats-checker', icon: CheckCircle },
    { name: 'Mock Test', href: '/mock-test', icon: BarChart3 },
    { name: 'Contact Us', href: '/contact', icon: MessageSquare },
    { name: 'About', href: '/about', icon: Info },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
          ATSify AI
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden lg:flex space-x-8 items-center">
          {menuItems.slice(0, 5).map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-jetbrains-mono"
            >
              {item.name}
            </a>
          ))}
          
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg font-jetbrains-mono"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconComponent size={20} />
                  <span>{item.name}</span>
                </a>
              );
            })}
            
            {/* Mobile theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg font-jetbrains-mono"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}