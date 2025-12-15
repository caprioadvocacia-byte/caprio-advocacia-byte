import React, { useState } from 'react';
import { Plus, Trash2, Upload, ArrowLeft, Edit2 } from 'lucide-react';
import { ReleaseCategory, Product } from '../types';

interface ReleasesManagerProps {
  categories: ReleaseCategory[];
  onUpdateCategories: (categories: ReleaseCategory[]) => void;
  onBack: () => void;
}

const ReleasesManager: React.FC<ReleasesManagerProps> = ({ categories, onUpdateCategories, onBack }) => {
  const [newCategoryTitle, setNewCategoryTitle] = useState('');

  // --- Category Handlers ---

  const handleAddCategory = () => {
    if (!newCategoryTitle.trim()) return;
    const newCategory: ReleaseCategory = {
      id: Date.now().toString(),
      title: newCategoryTitle,
      products: []
    };
    onUpdateCategories([newCategory, ...categories]);
    setNewCategoryTitle('');
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Tem certeza que deseja apagar esta categoria inteira?')) {
      onUpdateCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleUpdateCategoryTitle = (id: string, newTitle: string) => {
    onUpdateCategories(categories.map(c => c.id === id ? { ...c, title: newTitle } : c));
  };

  // --- Product Handlers ---

  const handleAddProduct = (categoryId: string) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: 'Novo Item',
      category: 'Street',
      price: 0,
      image: 'https://picsum.photos/400/400?grayscale',
      isNew: true
    };

    onUpdateCategories(categories.map(c => {
      if (c.id === categoryId) {
        return { ...c, products: [...c.products, newProduct] };
      }
      return c;
    }));
  };

  const handleDeleteProduct = (categoryId: string, productId: string) => {
    onUpdateCategories(categories.map(c => {
      if (c.id === categoryId) {
        return { ...c, products: c.products.filter(p => p.id !== productId) };
      }
      return c;
    }));
  };

  const handleUpdateProduct = (categoryId: string, productId: string, field: keyof Product, value: any) => {
    onUpdateCategories(categories.map(c => {
      if (c.id === categoryId) {
        const updatedProducts = c.products.map(p => 
          p.id === productId ? { ...p, [field]: value } : p
        );
        return { ...c, products: updatedProducts };
      }
      return c;
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: string, productId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateProduct(categoryId, productId, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Sticky Header with Back Button */}
        <div className="sticky top-20 z-40 bg-slate-50/90 backdrop-blur-sm py-4 border-b border-gray-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 text-street-900 font-bold uppercase tracking-wider hover:text-street-accent hover:border-street-accent transition-all shadow-sm"
          >
            <ArrowLeft size={20} /> Voltar para Home
          </button>
          
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold uppercase tracking-tighter text-street-900">
              Gerenciar Coleções
            </h1>
          </div>

          <div className="w-40 hidden md:block"></div> {/* Spacer for balance */}
        </div>

        {/* Add Category Input */}
        <div className="max-w-xl mx-auto mb-16 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Criar Nova Categoria</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={newCategoryTitle}
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              placeholder="Ex: Inverno 2024, Drop Skate..."
              className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-street-accent"
            />
            <button 
              onClick={handleAddCategory}
              className="bg-street-900 text-white px-6 py-2 rounded font-bold uppercase text-sm hover:bg-street-accent transition-colors flex items-center gap-2"
            >
              <Plus size={18} /> Adicionar
            </button>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-16">
          {categories.length === 0 && (
            <div className="text-center text-gray-400 py-20">
              <p>Nenhuma coleção criada. Adicione uma acima para começar.</p>
            </div>
          )}

          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              
              {/* Category Header */}
              <div className="bg-street-900 text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Edit2 size={18} className="text-street-accent" />
                  <input 
                    type="text"
                    value={category.title}
                    onChange={(e) => handleUpdateCategoryTitle(category.id, e.target.value)}
                    className="bg-transparent text-2xl font-display font-bold uppercase tracking-wider text-white border-b border-transparent hover:border-white focus:border-street-accent focus:outline-none w-full md:w-auto"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-400 hover:text-red-200 p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="Excluir Categoria"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* Add Product Card */}
                  <div 
                    onClick={() => handleAddProduct(category.id)}
                    className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-street-accent hover:bg-orange-50 transition-all group"
                  >
                    <div className="bg-gray-100 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                      <Plus size={32} className="text-gray-400 group-hover:text-street-accent" />
                    </div>
                    <span className="font-bold text-gray-400 uppercase text-xs tracking-widest group-hover:text-street-accent">Adicionar Produto</span>
                  </div>

                  {/* Product Items */}
                  {category.products.map((product) => (
                    <div key={product.id} className="relative group border border-gray-100 rounded-lg overflow-hidden bg-gray-50 hover:shadow-xl transition-all">
                      
                      {/* Delete Product */}
                      <button 
                        onClick={() => handleDeleteProduct(category.id, product.id)}
                        className="absolute top-2 right-2 z-20 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>

                      {/* Image Area */}
                      <div className="relative aspect-[3/4] bg-gray-200">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                        {/* Upload Overlay */}
                        <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <div className="text-white flex flex-col items-center gap-2">
                            <Upload size={24} />
                            <span className="text-xs font-bold uppercase">Alterar Foto</span>
                          </div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleFileChange(e, category.id, product.id)}
                          />
                        </label>
                      </div>

                      {/* Info Area */}
                      <div className="p-4 space-y-2">
                        <input 
                          type="text"
                          value={product.name}
                          onChange={(e) => handleUpdateProduct(category.id, product.id, 'name', e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded p-1.5 text-sm font-bold text-street-900 focus:border-street-accent outline-none"
                          placeholder="Nome do Produto"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">R$</span>
                          <input 
                            type="number"
                            value={product.price}
                            onChange={(e) => handleUpdateProduct(category.id, product.id, 'price', parseFloat(e.target.value))}
                            className="w-full bg-white border border-gray-200 rounded p-1.5 text-sm font-medium text-gray-700 focus:border-street-accent outline-none"
                            placeholder="0,00"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReleasesManager;