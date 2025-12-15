import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="bg-street-accent py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tighter mb-4">
          Entre para o Club
        </h2>
        <p className="mb-8 max-w-lg mx-auto text-white/90">
          Receba ofertas exclusivas, drop alerts e conteúdo irado direto na sua caixa de entrada. Ganhe 10% OFF na primeira compra.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            className="flex-1 px-6 py-4 rounded text-street-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-street-900 text-white font-bold uppercase tracking-wider px-8 py-4 rounded hover:bg-black transition-colors">
            Inscrever
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;