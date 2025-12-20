import React from 'react';

const AboutSection = () => {
  return (
    <section id="sobre" className="py-16 md:py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        <div className="space-y-6 order-2 md:order-1">
          <h2 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tighter leading-none text-center md:text-left">
            Nossa História <br />
            <span className="text-orange-500 text-2xl md:text-3xl block mt-2">Via Surf | Surf & Skate</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto md:mx-0"></div>
          
          {/* Texto flui naturalmente sem scroll interno para melhor UX no mobile */}
          <div className="text-gray-300 space-y-4 text-sm md:text-base leading-relaxed font-light text-justify md:text-left">
            <p>
              A Via Surf é uma loja referência em surf, skate e streetwear em Viamão RS, com 25 anos de tradição, reconhecida pela qualidade, variedade e autenticidade de seus produtos. Trabalhamos com tênis masculinos, femininos e infantis 100% originais, atendendo tanto praticantes de skate quanto quem busca conforto e estilo no dia a dia.
            </p>
            <p>
              Somos revendedores autorizados de grandes marcas como Oakley, Öus, Qix, Mormaii, Mizuno, Olympikus, Skechers, Tesla, Hocks, Freeday, Kolosh, Ramarim e Mad Rats, garantindo procedência, confiança e atendimento especializado para clientes de Viamão e região.
            </p>
            <p>
              Além dos calçados, a Via Surf oferece vestuário surf e streetwear das melhores marcas do mercado, como Quiksilver, Oakley, Hurley, LRG, Roxy e Free Surf, com camisetas do P ao 4G, além de uma ampla linha de bonés originais que completam o lifestyle surf e skate.
            </p>
            <p className="font-bold text-white">
              Com loja física em Viamão RS e foco em produtos originais, a Via Surf é o destino certo para quem procura estilo, atitude e qualidade no universo surf, skate e streetwear.
            </p>
          </div>
        </div>
        
        <div className="relative group order-1 md:order-2">
          <div className="absolute -inset-2 bg-orange-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <img 
            src="https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1000&auto=format&fit=crop" 
            alt="Skateboarder" 
            className="relative w-full rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 transform group-hover:-translate-y-2 aspect-video md:aspect-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;