import React from 'react';
import ProductCard from './ProductCard';
import { Collection } from '../types';
import { Edit } from 'lucide-react';

interface ProductsSectionProps {
  collections: Collection[];
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  onOpenAdmin: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ 
  collections, 
  activeTabId, 
  setActiveTabId, 
  onOpenAdmin 
}) => {
  
  // Encontra a coleção ativa baseada no ID selecionado ou fallback para a primeira
  const activeCollection = collections.find(c => c.id === activeTabId) || collections[0];

  return (
    // Adicionado scroll-mt-28 para que o header fixo não cubra o título ao navegar
    <section id="colecoes" className="py-16 md:py-20 container mx-auto px-4 min-h-[600px] scroll-mt-28">
      <div className="text-center mb-10 relative">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 uppercase tracking-tighter mb-4 inline-flex items-center gap-4">
          Nossas Coleções
          <button 
            onClick={onOpenAdmin}
            className="md:hidden bg-gray-100 p-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-gray-200 transition-colors"
            title="Editar Coleções"
          >
            <Edit size={20} />
          </button>
        </h2>
        <div className="w-16 md:w-24 h-1 bg-orange-500 mx-auto"></div>
        
        {/* Botão de Edição Desktop (Flutuante ao lado do título ou abaixo) */}
        <div className="hidden md:block absolute right-0 top-0">
          <button 
            onClick={onOpenAdmin}
            className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400 hover:text-orange-500 transition-colors border border-gray-200 hover:border-orange-500 px-3 py-1 rounded-full"
          >
            <Edit size={14} /> Editar Produtos
          </button>
        </div>
      </div>

      {/* Abas de Navegação (Coleções) */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => setActiveTabId(collection.id)}
            className={`px-6 py-2 rounded-full text-sm md:text-base font-bold uppercase tracking-wide transition-all duration-300 ${
              activeCollection?.id === collection.id
                ? 'bg-black text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {collection.title}
          </button>
        ))}
      </div>

      {/* Conteúdo da Aba Ativa */}
      {activeCollection && (
        <div className="animate-fade-in-up">
          {/* Descrição da Coleção */}
          {activeCollection.description && (
            <p className="text-center text-gray-500 mb-8 -mt-6 italic">
              {activeCollection.description}
            </p>
          )}

          {/* Grid de Produtos */}
          {activeCollection.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {activeCollection.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>Nenhum produto nesta coleção no momento.</p>
              <button 
                onClick={onOpenAdmin} 
                className="mt-4 text-orange-500 font-bold hover:underline"
              >
                Adicionar Produto Agora
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="text-center mt-16">
        <a 
          href="https://wa.me/555134443574" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 md:px-10 md:py-3 text-sm md:text-base uppercase font-bold tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300"
        >
          Falar com Vendedor
        </a>
      </div>
    </section>
  );
};

export default ProductsSection;