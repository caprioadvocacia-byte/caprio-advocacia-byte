import React, { useState, useEffect } from 'react';
import { Settings, Plus, Save, Layers, XCircle, SearchX } from 'lucide-react';
import ProductCard from './ProductCard';
import { FEATURED_PRODUCTS } from '../constants';
import { Product, SECTION_ID } from '../types';

interface ProductsSectionProps {
  onNavigateToReleases?: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ 
  onNavigateToReleases, 
  searchQuery = '', 
  onClearSearch 
}) => {
  const [products, setProducts] = useState<Product[]>(FEATURED_PRODUCTS);
  const [isEditing, setIsEditing] = useState(false);

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: 'Novo Produto',
      category: 'Street',
      price: 0.00,
      image: 'https://picsum.photos/400/500?grayscale', // Placeholder
      isNew: true
    };
    setProducts([...products, newProduct]);
  };

  return (
    <section id={SECTION_ID.PRODUCTS} className="py-20 container mx-auto px-4">
      <div className="flex flex-col items-center mb-16 relative">
        <h2 className="font-display font-bold text-4xl text-street-900 uppercase tracking-tighter mb-4 text-center">
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Destaques da Temporada'}
        </h2>
        <div className="w-20 h-1 bg-street-accent mx-auto mb-4"></div>
        
        {/* Search Clear Button */}
        {searchQuery && onClearSearch && (
          <button 
            onClick={onClearSearch}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors mb-4"
          >
            <XCircle size={18} /> Limpar busca
          </button>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {/* Edit Home Products Toggle */}
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              isEditing 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isEditing ? (
              <> <Save size={16} /> Salvar Destaques </>
            ) : (
              <> <Settings size={16} /> Editar Destaques </>
            )}
          </button>
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isEditing={isEditing}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
            />
          ))}

          {/* Add Product Button (Only in Edit Mode and if not filtering) */}
          {isEditing && !searchQuery && (
            <div 
              onClick={handleAddProduct}
              className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-8 cursor-pointer hover:border-street-accent hover:bg-orange-50 transition-all min-h-[400px]"
            >
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Plus size={32} className="text-street-accent" />
              </div>
              <span className="font-bold text-gray-500 uppercase tracking-wider">Adicionar Produto</span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <SearchX size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-500">Tente buscar por termos como "Surf", "Street" ou nomes de produtos.</p>
          {onClearSearch && (
            <button 
              onClick={onClearSearch}
              className="mt-6 text-street-accent font-bold hover:underline"
            >
              Ver todos os produtos
            </button>
          )}
        </div>
      )}
      
      {!isEditing && !searchQuery && (
        <div className="text-center mt-12">
          <button 
            onClick={onNavigateToReleases}
            className="border-2 border-street-900 text-street-900 px-10 py-3 uppercase font-bold tracking-wider hover:bg-street-900 hover:text-white transition-all"
          >
            Coleções e Lançamentos
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductsSection;