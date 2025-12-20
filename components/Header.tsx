import React, { useState } from 'react';
import { Menu, X, Edit } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onToggleAdmin: () => void;
  onHomeClick: () => void;
  customLogo: string | null;
  logoHeight: number;
}

const Header: React.FC<HeaderProps> = ({ onToggleAdmin, onHomeClick, customLogo, logoHeight }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mapeamento explícito dos botões para os IDs das seções
  const navItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Produtos', href: '#colecoes' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ];

  // Função unificada para manipular cliques nos links de navegação
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Previne o comportamento padrão de "pulo" seco
    setIsMenuOpen(false); // Fecha o menu mobile se estiver aberto

    if (href === '#inicio') {
      onHomeClick();
    } else {
      // Busca o elemento pelo ID (ex: #contato, #colecoes)
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed w-full z-50 bg-black/95 backdrop-blur-sm py-4 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo - Leva ao início */}
        <a 
          href="#inicio" 
          onClick={(e) => handleLinkClick(e, '#inicio')}
          className="hover:opacity-80 transition-opacity z-50 flex items-center"
        >
          <Logo variant="header" customSource={customLogo} customHeight={logoHeight} />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-sm font-bold uppercase text-gray-300 hover:text-orange-500 transition-colors tracking-wide"
            >
              {item.label}
            </a>
          ))}
          
          {/* Botão Admin Desktop */}
          <button
            onClick={onToggleAdmin}
            className="flex items-center gap-2 bg-gray-800 hover:bg-orange-500 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors border border-gray-700 hover:border-orange-500"
          >
            <Edit size={14} />
            Editar Loja
          </button>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white hover:text-orange-500 transition-colors z-50 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center md:hidden animate-fade-in-down">
          <nav className="flex flex-col space-y-8 text-center items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white text-2xl font-display font-bold uppercase hover:text-orange-500 transition-colors"
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            
            {/* Botão Admin Mobile */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onToggleAdmin();
              }}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-lg font-bold uppercase tracking-wider mt-4 border border-gray-700 px-6 py-3 rounded"
            >
              <Edit size={20} />
              Editar Loja
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;