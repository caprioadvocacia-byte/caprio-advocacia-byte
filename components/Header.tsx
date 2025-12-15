import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Edit2, Check, X as XIcon, Upload } from 'lucide-react';
import { NAV_LINKS, BRAND_LOGO } from '../constants';

interface HeaderProps {
  logoUrl: string;
  onLogoUpdate: (newUrl: string) => void;
  onNavigate: (href: string) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ logoUrl, onLogoUpdate, onNavigate, onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // State for Editable Logo
  const [isEditingLogo, setIsEditingLogo] = useState(false);
  const [tempLogoUrl, setTempLogoUrl] = useState(logoUrl);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync temp logo when prop changes (if not editing)
  useEffect(() => {
    if (!isEditingLogo) {
      setTempLogoUrl(logoUrl);
    }
  }, [logoUrl, isEditingLogo]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSaveLogo = () => {
    onLogoUpdate(tempLogoUrl);
    setIsEditingLogo(false);
  };

  const handleCancelEdit = () => {
    setTempLogoUrl(logoUrl);
    setIsEditingLogo(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 bg-black shadow-lg border-b border-gray-800 ${
        isScrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center relative">
        {/* Logo Area */}
        <div className="relative group z-10">
          {isEditingLogo ? (
            <div className="flex flex-col gap-3 bg-white p-4 rounded shadow-xl absolute top-0 left-0 z-50 min-w-[320px]">
               {/* File Upload Button */}
               <label className="cursor-pointer flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm font-medium transition-colors border border-gray-200">
                  <Upload size={16} />
                  <span>Carregar do Dispositivo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
               </label>
              
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span>OU URL</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={tempLogoUrl.startsWith('data:') ? '' : tempLogoUrl}
                  onChange={(e) => setTempLogoUrl(e.target.value)}
                  className="flex-1 text-black text-xs border border-gray-300 rounded px-2 py-2 outline-none focus:border-street-accent"
                  placeholder="https://..."
                  autoFocus
                />
                <button onClick={handleSaveLogo} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors">
                  <Check size={16} />
                </button>
                <button onClick={handleCancelEdit} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors">
                  <XIcon size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <a 
                href="#hero" 
                className="block w-32 md:w-40"
                onClick={(e) => handleNavClick(e, '#hero')}
              >
                <img 
                  src={logoUrl} 
                  alt="Via Surf" 
                  className="w-full h-auto object-contain"
                />
              </a>
              {/* Edit Trigger (Visible on Hover) */}
              <button 
                onClick={() => setIsEditingLogo(true)}
                className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black p-1.5 rounded-full shadow-lg hover:scale-110"
                title="Editar Logo"
              >
                <Edit2 size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        {!isSearchOpen && (
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium uppercase tracking-widest text-white/90 hover:text-street-accent transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <form onSubmit={handleSearchSubmit} className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black px-16 md:px-60">
            <input 
              ref={searchInputRef}
              type="text" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full bg-transparent border-b-2 border-street-accent text-white text-xl placeholder-gray-500 focus:outline-none pb-2"
            />
            <button type="submit" className="text-street-accent ml-4 hover:text-white transition-colors">
              <Check size={24} />
            </button>
          </form>
        )}

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6 z-10">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`transition-colors ${isSearchOpen ? 'text-street-accent' : 'text-white hover:text-street-accent'}`}
            title="Pesquisar"
          >
            {isSearchOpen ? <XIcon size={20} /> : <Search size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4 z-10">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-white hover:text-street-accent transition-colors"
          >
            {isSearchOpen ? <XIcon size={24} /> : <Search size={24} />}
          </button>
          
          {!isSearchOpen && (
            <button 
              className="text-white hover:text-street-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && !isSearchOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-t border-gray-800 shadow-xl p-4 flex flex-col space-y-4 animate-fade-in-up">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white font-bold text-lg uppercase py-2 border-b border-gray-800 hover:text-street-accent cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;