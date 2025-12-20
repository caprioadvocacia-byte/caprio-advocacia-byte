import React from 'react';
import { Clock, Bike } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6 md:gap-8 text-center max-w-4xl mx-auto">
        <div className="p-6 bg-gray-50 md:bg-transparent md:hover:bg-gray-50 rounded-lg transition-colors group">
          <div className="text-orange-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">
            <Clock size={32} className="md:w-10 md:h-10" />
          </div>
          <h3 className="font-display font-bold text-lg md:text-xl uppercase mb-2 text-gray-900">Horário de Atendimento</h3>
          <p className="text-sm md:text-base text-gray-500">Segunda a Sábado das 9h às 21h.</p>
        </div>
        <div className="p-6 bg-gray-50 md:bg-transparent md:hover:bg-gray-50 rounded-lg transition-colors group">
          <div className="text-orange-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">
            <Bike size={32} className="md:w-10 md:h-10" />
          </div>
          <h3 className="font-display font-bold text-lg md:text-xl uppercase mb-2 text-gray-900">Tele Entrega</h3>
          <p className="text-sm md:text-base text-gray-500">Entrega rápida via motoboy para toda a região.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;