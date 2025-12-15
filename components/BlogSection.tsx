import React from 'react';
import { SECTION_ID } from '../types';
import { BLOG_POSTS } from '../constants';
import { ArrowUpRight, Tag } from 'lucide-react';

const BlogSection: React.FC = () => {
  return (
    <section id={SECTION_ID.BLOG} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-street-accent font-bold uppercase tracking-widest text-xs mb-2 block">Lifestyle & Dicas</span>
            <h2 className="font-display font-bold text-4xl text-street-900 uppercase tracking-tighter mb-2">The Journal</h2>
            <p className="text-gray-500 max-w-lg">Conteúdo exclusivo para quem vive o lifestyle do surf e das ruas. Fique por dentro de tudo.</p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-street-accent font-bold uppercase tracking-wider hover:underline hover:text-orange-700 transition-colors">
            Ver todas as matérias <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="group cursor-pointer flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="overflow-hidden rounded-t-lg aspect-[4/3] relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={14} className="text-street-accent" />
                  <span className="text-xs font-bold text-street-accent uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-lg text-street-900 mb-3 leading-tight group-hover:text-street-accent transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-400 font-mono mt-auto">
                  <span>{post.date}</span>
                  <span>5 min leitura</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
           <a href="#" className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm text-street-accent font-bold uppercase tracking-wider">
            Ver blog completo <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;