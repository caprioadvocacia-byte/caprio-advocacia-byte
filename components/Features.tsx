import React from 'react';
import { Clock, Bike } from 'lucide-react';

const features = [
  {
    icon: <Clock size={32} />,
    title: "Horário de Atendimento",
    description: "Segunda a Sábado das 9h às 21h."
  },
  {
    icon: <Bike size={32} />,
    title: "Tele Entrega",
    description: "Entrega rápida via motoboy para toda a região."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Layout adjusted to center the 2 remaining items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 hover:bg-gray-50 transition-colors rounded-lg">
              <div className="text-street-accent mb-4 p-3 bg-orange-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-lg uppercase mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;