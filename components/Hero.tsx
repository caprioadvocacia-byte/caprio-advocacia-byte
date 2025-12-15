import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SECTION_ID } from '../types';

const Hero: React.FC = () => {
  const whatsappUrl = "https://wa.me/555134443574";

  return (
    <section id={SECTION_ID.HERO} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop" 
          alt="Surfer catching a wave" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tighter mb-6 drop-shadow-lg leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Mais de 25 anos de <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">tradição em surf e skate</span>
        </h1>

        <div className="animate-fade-in-up space-y-2 mb-10" style={{ animationDelay: '0.2s' }}>
          <p className="max-w-xl mx-auto text-xl md:text-2xl text-white font-bold tracking-wide uppercase">
            Produtos 100% originais
          </p>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-200">
            👉 Clique no botão e compre pelo WhatsApp
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-street-accent hover:bg-orange-600 text-white px-8 py-4 rounded-none font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            Comprar Agora
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;