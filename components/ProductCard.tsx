import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {product.tag && (
          <span className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 uppercase shadow-md">
            {product.tag}
          </span>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1 font-bold tracking-wider">{product.category}</p>
          <h3 className="font-display font-bold text-lg text-gray-900 mb-2 leading-tight group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
          {/* Descrição do Produto */}
          {product.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
        <span className="font-bold text-gray-900 text-lg mt-2 block border-t border-gray-100 pt-3">
          {product.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;