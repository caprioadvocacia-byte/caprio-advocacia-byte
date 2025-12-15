import React from 'react';
import { ShoppingCart, Heart, Trash2, Upload, DollarSign } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isEditing?: boolean;
  onUpdate?: (id: string, field: keyof Product, value: any) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isEditing = false, onUpdate, onDelete }) => {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdate) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(product.id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300 ease-out h-full flex flex-col">
      {/* Badge */}
      {!isEditing && product.isNew && (
        <span className="absolute top-4 left-4 z-10 bg-street-accent text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
          Novo
        </span>
      )}
      
      {/* Delete Button (Edit Mode) */}
      {isEditing && onDelete && (
        <button 
          onClick={() => onDelete(product.id)}
          className="absolute top-2 right-2 z-20 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
          title="Remover produto"
        >
          <Trash2 size={16} />
        </button>
      )}
      
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Edit Image Overlay */}
        {isEditing && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 gap-3 z-30 transition-opacity">
            <label className="cursor-pointer bg-white text-street-900 hover:bg-street-accent hover:text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all shadow-lg transform hover:scale-105">
              <Upload size={16} />
              Escolher Imagem
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
            <div className="w-full border-t border-white/20 my-1"></div>
            <div className="w-full">
              <input 
                type="text" 
                value={product.image.length > 50 ? '' : product.image} // Don't show base64 strings
                onChange={(e) => onUpdate && onUpdate(product.id, 'image', e.target.value)}
                className="w-full text-xs p-2 rounded bg-black/50 text-white border border-white/30 focus:border-street-accent focus:outline-none placeholder:text-white/40"
                placeholder="Ou cole URL da imagem..."
              />
            </div>
          </div>
        )}
        
        {/* Quick Actions Overlay (View Mode) */}
        {!isEditing && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <button className="bg-white text-street-900 p-3 rounded-full hover:bg-street-accent hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
              <ShoppingCart size={20} />
            </button>
            <button className="bg-white text-street-900 p-3 rounded-full hover:bg-red-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
              <Heart size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col justify-end">
        {isEditing ? (
          <div className="space-y-3">
             <input 
              type="text"
              value={product.name}
              onChange={(e) => onUpdate && onUpdate(product.id, 'name', e.target.value)}
              className="w-full border p-2 rounded text-sm font-bold bg-gray-50 focus:bg-white transition-colors"
              placeholder="Nome do Produto"
            />
            <div className="flex items-center gap-2">
              <DollarSign size={14} className="text-gray-500" />
              <input 
                type="number"
                value={product.price}
                onChange={(e) => onUpdate && onUpdate(product.id, 'price', parseFloat(e.target.value))}
                className="w-full border p-2 rounded text-sm bg-gray-50 focus:bg-white transition-colors"
                placeholder="Preço"
              />
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category}</p>
            <h3 className="font-display font-bold text-lg text-street-900 mb-2 truncate group-hover:text-street-accent transition-colors">
              {product.name}
            </h3>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;