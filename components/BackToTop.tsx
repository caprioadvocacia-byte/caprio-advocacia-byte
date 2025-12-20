import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Monitora o scroll para mostrar/esconder o botão
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Função para rolar suavemente até o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-40 p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-orange-500 hover:border-orange-500 hover:scale-110 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
    </button>
  );
};

export default BackToTop;