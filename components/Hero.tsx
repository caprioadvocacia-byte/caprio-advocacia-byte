import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    // min-h-[100dvh] garante que ocupe a altura total visível em celulares, evitando cortes pela barra de endereço
    <section id="inicio" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop" 
          alt="Surfer catching a wave" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center text-white mt-16 md:mt-0">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold uppercase mb-6 animate-fade-in-up drop-shadow-xl tracking-wide leading-tight">
          Mais de 25 anos de <br />
          <span className="text-orange-500">Tradição e Estilo</span>
        </h1>
        <p className="text-base sm:text-lg md:text-2xl mb-8 uppercase tracking-widest font-light animate-fade-in-up delay-200 px-4 md:px-0">
          Produtos 100% Originais | Surf & Skate
        </p>
        <a 
          href="https://wa.me/555134443574" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-4 font-bold uppercase tracking-wider transition-all transform hover:scale-105 animate-fade-in-up delay-400 shadow-lg rounded-sm text-sm md:text-base"
        >
          Comprar Agora <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;