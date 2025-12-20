import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Os produtos são originais?",
    answer: "Sim! A Via Surf é revendedora autorizada de todas as marcas que trabalha, incluindo Oakley, Quiksilver, Öus e muitas outras. Garantimos a procedência de 100% do nosso estoque."
  },
  {
    question: "Vocês fazem entregas em Viamão?",
    answer: "Com certeza. Oferecemos tele-entrega via motoboy para toda a região de Viamão com rapidez. Para outras regiões, enviamos via Correios ou Transportadora."
  },
  {
    question: "Quais são as formas de pagamento?",
    answer: "Aceitamos cartão de crédito em até 6X, pix e dinheiro."
  },
  {
    question: "Posso trocar se não servir?",
    answer: "Sim. Seguimos o Código de Defesa do Consumidor. Trocas por tamanho ou modelo podem ser feitas em até 7 dias na loja física, desde que o produto esteja com etiqueta e sem uso."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-3xl text-gray-900 uppercase">Dúvidas Frequentes</h2>
          <p className="text-gray-500 mt-2">Tudo o que você precisa saber antes de comprar.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md border-orange-200' : 'hover:border-gray-300'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left bg-white focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-orange-500' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="text-orange-500 flex-shrink-0" size={20} />
                ) : (
                  <Plus className="text-gray-400 flex-shrink-0" size={20} />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-transparent">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;