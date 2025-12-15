import React from 'react';
import { SECTION_ID } from '../types';

const AboutSection: React.FC = () => {
  return (
    <section id={SECTION_ID.ABOUT} className="py-20 bg-street-900 text-white relative overflow-hidden">
      {/* Decorative Texture */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-street-accent opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tighter">
            Nascidos no Sal, <br />Criados no Concreto.
          </h2>
          <div className="w-20 h-1 bg-street-accent"></div>
          <article className="text-gray-300 space-y-4 text-sm md:text-base leading-relaxed font-light">
            <p>
              A Via Surf é uma loja referência em surf, skate e streetwear em Viamão RS, reconhecida pela variedade, qualidade e autenticidade de seus produtos. Trabalhamos com uma ampla linha de tênis masculinos, femininos e infantis, ideais tanto para quem anda de skate quanto para quem busca conforto e estilo no dia a dia, sempre com produtos 100% originais.
            </p>
            <p>
              Somos revendedores autorizados das principais marcas do mercado, como Oakley, Öus, Qix, Mormaii, Mizuno, Olympikus, Skechers, Tesla, Hocks, Freeday, Kolosh, Ramarim, Mad Rats, garantindo procedência, confiança e o melhor atendimento para nossos clientes em Viamão e região.
            </p>
            <p>
              Além dos calçados, a Via Surf se destaca por trabalhar com as melhores marcas de vestuário surf e streetwear, como Quiksilver, Oakley, Hurley, LRG, Roxy e Free Surf, oferecendo camisetas em diversos modelos, cores e tamanhos — do P ao 4G — incluindo opções minimalistas e oversized, sempre unindo conforto, qualidade e autenticidade.
            </p>
            <p>
              Também contamos com uma grande variedade de bonés originais, com modelos de aba reta, aba curva, snapback e fechados, das marcas Oakley, Quiksilver e Hurley, perfeitos para completar o lifestyle surf, skate e streetwear.
            </p>
            <p className="font-medium text-white">
              Com 25 anos de tradição, loja física em Viamão RS e atendimento especializado, a Via Surf é o lugar certo para quem procura produtos originais, estilo e atitude no universo surf e skate.
            </p>
          </article>
        </div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="w-full">
            <img 
              src="https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1000&auto=format&fit=crop" 
              alt="Skateboarding trick" 
              className="w-full rounded-lg shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;