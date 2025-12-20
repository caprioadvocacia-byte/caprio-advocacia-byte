import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  return (
    <section id="blog" className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Lifestyle & Dicas</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 uppercase mt-2">
            Últimas do Blog
          </h2>
          <div className="w-16 h-1 bg-gray-900 mx-auto mt-4"></div>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback para imagem quebrada
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                  </div>
                  
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-3 leading-tight group-hover:text-orange-500 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <a href="#" className="inline-flex items-center text-orange-500 font-bold text-sm hover:text-orange-600 transition-colors mt-auto">
                    Ler Matéria Completa <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma postagem disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;