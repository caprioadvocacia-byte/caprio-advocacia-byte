import React, { useState, useRef } from 'react';
import { Collection, Product, BlogPost } from '../types';
import { Plus, Trash2, ArrowLeft, Save, Edit2, XCircle, Upload, Image as ImageIcon, Settings, Newspaper, ShoppingBag, Maximize } from 'lucide-react';

interface AdminPanelProps {
  collections: Collection[];
  onUpdateCollections: (newCollections: Collection[]) => void;
  blogPosts: BlogPost[];
  onUpdateBlogPosts: (newPosts: BlogPost[]) => void;
  onClose: () => void;
  currentLogo: string | null;
  onUpdateLogo: (logo: string | null) => void;
  logoHeight: number;
  onUpdateLogoHeight: (height: number) => void;
}

type Tab = 'products' | 'blog';

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  collections, 
  onUpdateCollections, 
  blogPosts,
  onUpdateBlogPosts,
  onClose,
  currentLogo,
  onUpdateLogo,
  logoHeight,
  onUpdateLogoHeight
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('products');
  
  // --- STATES DE PRODUTO ---
  const [selectedCollectionId, setSelectedCollectionId] = useState(collections[0]?.id || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '', price: '', image: '', category: '', description: '', tag: ''
  });

  // --- STATES DE BLOG ---
  const blogFileInputRef = useRef<HTMLInputElement>(null);
  const [editingBlogPostId, setEditingBlogPostId] = useState<number | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '', excerpt: '', image: '', author: 'Equipe Via Surf', date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
  });

  // ==============================================================================
  // LÓGICA DE PRODUTOS
  // ==============================================================================

  const handleEditClick = (product: Product) => {
    setProductForm({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description || '',
      tag: product.tag || ''
    });
    setEditingProductId(product.id);
    const formElement = document.getElementById('product-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setProductForm({ name: '', price: '', image: '', category: '', description: '', tag: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProductForm({ ...productForm, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !selectedCollectionId) return;

    const updatedCollections = collections.map(col => {
      if (col.id === selectedCollectionId) {
        let updatedProducts = [...col.products];
        if (editingProductId) {
          updatedProducts = updatedProducts.map(p => 
            p.id === editingProductId ? { ...p, ...productForm, id: p.id } as Product : p
          );
        } else {
          updatedProducts.push({
            id: Date.now(),
            name: productForm.name!,
            price: productForm.price!,
            image: productForm.image || 'https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=800&auto=format&fit=crop',
            category: productForm.category || 'Geral',
            description: productForm.description || '',
            tag: productForm.tag || undefined
          });
        }
        return { ...col, products: updatedProducts };
      }
      return col;
    });

    onUpdateCollections(updatedCollections);
    handleCancelEdit(); 
    alert(editingProductId ? 'Produto atualizado!' : 'Produto adicionado!');
  };

  const handleDeleteProduct = (collectionId: string, productId: number) => {
    if(!window.confirm("Remover este produto?")) return;
    if (editingProductId === productId) handleCancelEdit();

    const updatedCollections = collections.map(col => {
      if (col.id === collectionId) {
        return { ...col, products: col.products.filter(p => p.id !== productId) };
      }
      return col;
    });
    onUpdateCollections(updatedCollections);
  };

  // ==============================================================================
  // LÓGICA DE BLOG
  // ==============================================================================

  const handleEditBlogClick = (post: BlogPost) => {
    setBlogForm({
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      author: post.author,
      date: post.date
    });
    setEditingBlogPostId(post.id);
    const formElement = document.getElementById('blog-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelBlogEdit = () => {
    setEditingBlogPostId(null);
    setBlogForm({ title: '', excerpt: '', image: '', author: 'Equipe Via Surf', date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) });
    if (blogFileInputRef.current) blogFileInputRef.current.value = '';
  };

  const handleBlogImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBlogForm({ ...blogForm, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.excerpt) return;

    let updatedPosts = [...blogPosts];

    if (editingBlogPostId) {
      updatedPosts = updatedPosts.map(p => 
        p.id === editingBlogPostId ? { ...p, ...blogForm, id: p.id } as BlogPost : p
      );
    } else {
      updatedPosts.push({
        id: Date.now(),
        title: blogForm.title!,
        excerpt: blogForm.excerpt!,
        image: blogForm.image || 'https://images.unsplash.com/photo-1523396864712-ecc4a4394e21?q=80&w=800&auto=format&fit=crop',
        date: blogForm.date || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
        author: blogForm.author || 'Equipe Via Surf'
      });
    }

    onUpdateBlogPosts(updatedPosts);
    handleCancelBlogEdit();
    alert(editingBlogPostId ? 'Post atualizado!' : 'Post publicado!');
  };

  const handleDeleteBlogPost = (postId: number) => {
    if(!window.confirm("Remover esta postagem?")) return;
    if (editingBlogPostId === postId) handleCancelBlogEdit();
    onUpdateBlogPosts(blogPosts.filter(p => p.id !== postId));
  };

  // ==============================================================================
  // LÓGICA DE LOGO
  // ==============================================================================

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateLogo(reader.result as string);
        alert('Logo atualizado com sucesso!');
      };
      reader.readAsDataURL(file);
    }
  };

  const activeCollection = collections.find(c => c.id === selectedCollectionId);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 animate-fade-in-up">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header do Admin */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200 gap-4">
          <div>
            <h1 className="font-display font-bold text-3xl text-gray-900 uppercase">
              Painel Administrativo
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Gerencie produtos, blog e aparência da loja.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-bold transition-colors bg-gray-100 px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} /> Voltar ao Site
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 font-bold uppercase text-sm border-b-2 transition-colors ${
              activeTab === 'products' 
                ? 'border-orange-500 text-orange-500' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <ShoppingBag size={18} /> Gerenciar Produtos
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-2 px-6 py-3 font-bold uppercase text-sm border-b-2 transition-colors ${
              activeTab === 'blog' 
                ? 'border-orange-500 text-orange-500' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Newspaper size={18} /> Lifestyle & Blog
          </button>
        </div>

        {activeTab === 'products' ? (
          // ==========================
          // ABA DE PRODUTOS
          // ==========================
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Coluna 1: Configurações e Formulário */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* --- CONFIGURAÇÃO DO LOGO --- */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                  <Settings className="text-orange-500" size={24} />
                  Aparência da Loja
                </h2>
                
                <div className="space-y-6">
                  {/* Upload do Logo */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Logo</label>
                    <div className="bg-gray-900 p-4 rounded-lg flex items-center justify-center mb-2 overflow-hidden relative" style={{ height: '100px' }}>
                      {currentLogo ? (
                        <img 
                          src={currentLogo} 
                          alt="Logo Atual" 
                          style={{ height: `${logoHeight}px`, maxHeight: '100%' }}
                          className="w-auto object-contain transition-all" 
                        />
                      ) : (
                        <p className="text-white text-xs text-center">Logo Padrão Ativo</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <input type="file" ref={logoInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                      <button onClick={() => logoInputRef.current?.click()} className="w-full py-2 px-4 bg-gray-800 text-white rounded flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors text-xs font-bold uppercase">
                        <Upload size={14} /> Carregar Novo Logo
                      </button>
                      {currentLogo && (
                        <button onClick={() => { onUpdateLogo(null); alert('Logo restaurado.'); }} className="text-xs text-red-500 hover:text-red-700 underline text-center">
                          Restaurar Padrão
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Controle de Tamanho */}
                  <div className="border-t border-gray-100 pt-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex justify-between">
                      <span className="flex items-center gap-1"><Maximize size={14}/> Tamanho (Desktop)</span>
                      <span className="text-orange-500">{logoHeight}px</span>
                    </label>
                    <input 
                      type="range" 
                      min="30" 
                      max="120" 
                      value={logoHeight} 
                      onChange={(e) => onUpdateLogoHeight(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Ajuste a altura do logo no menu principal.</p>
                  </div>
                </div>
              </div>

              {/* --- FORMULÁRIO DE PRODUTO --- */}
              <div id="product-form" className={`bg-white p-6 rounded-lg shadow-sm border ${editingProductId ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-200'} transition-all`}>
                <h2 className="font-display font-bold text-xl mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {editingProductId ? <Edit2 className="text-orange-500" size={24} /> : <Plus className="text-orange-500" size={24} />}
                    {editingProductId ? 'Editar Produto' : 'Novo Produto'}
                  </span>
                  {editingProductId && (
                    <button onClick={handleCancelEdit} className="text-xs text-red-500 hover:text-red-700 underline">
                      Cancelar
                    </button>
                  )}
                </h2>
                
                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Coleção</label>
                    <select 
                      value={selectedCollectionId}
                      onChange={(e) => { setSelectedCollectionId(e.target.value); if (editingProductId) handleCancelEdit(); }}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      disabled={!!editingProductId}
                    >
                      {collections.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome</label>
                    <input type="text" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} placeholder="Ex: Tênis Vans" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Preço</label>
                      <input type="text" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} placeholder="R$ 0,00" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoria</label>
                      <input type="text" value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})} placeholder="Ex: Street" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                  </div>

                  {/* Upload de Imagem Produto */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Imagem</label>
                    {productForm.image && (
                      <div className="mb-3 w-full h-32 bg-gray-100 rounded-lg overflow-hidden relative group border border-gray-200">
                        <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => { setProductForm({...productForm, image: ''}); if(fileInputRef.current) fileInputRef.current.value = ''; }} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><XCircle size={16} /></button>
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-2 px-4 bg-gray-800 text-white rounded flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors text-sm font-bold uppercase"><Upload size={16} /> Enviar Foto</button>
                      <div className="relative flex py-1 items-center"><div className="flex-grow border-t border-gray-200"></div><span className="flex-shrink-0 mx-2 text-gray-300 text-[10px] uppercase">Ou link</span><div className="flex-grow border-t border-gray-200"></div></div>
                      <div className="flex items-center gap-2 border border-gray-300 rounded p-2 bg-white"><ImageIcon size={16} className="text-gray-400" /><input type="text" value={productForm.image} onChange={(e) => setProductForm({...productForm, image: e.target.value})} placeholder="URL da imagem" className="w-full text-xs focus:outline-none" /></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tag</label>
                    <input type="text" value={productForm.tag} onChange={(e) => setProductForm({...productForm, tag: e.target.value})} placeholder="Ex: Promoção" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição</label>
                    <textarea value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} placeholder="Detalhes..." className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none h-24 resize-none" />
                  </div>

                  <button type="submit" className={`w-full ${editingProductId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-3 rounded transition-colors flex justify-center items-center gap-2`}>
                    <Save size={18} /> {editingProductId ? 'Atualizar' : 'Salvar'}
                  </button>
                </form>
              </div>
            </div>

            {/* Coluna 2 e 3: Lista de Produtos */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-display font-bold text-xl mb-6 border-b border-gray-100 pb-4">
                  Produtos em: <span className="text-orange-500">{activeCollection?.title}</span>
                </h2>
                {activeCollection?.products && activeCollection.products.length > 0 ? (
                  <div className="space-y-4">
                    {activeCollection.products.map((product) => (
                      <div key={product.id} className={`flex gap-4 items-start border p-4 rounded-lg transition-all bg-white group ${editingProductId === product.id ? 'border-orange-500 ring-1 ring-orange-500 shadow-md' : 'border-gray-100 hover:border-orange-200'}`}>
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative"><img src={product.image} alt={product.name} className="w-full h-full object-cover" /></div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
                            <div className="flex gap-2">
                              <button onClick={() => handleEditClick(product)} className="text-blue-500 hover:text-blue-700 p-2"><Edit2 size={18} /></button>
                              <button onClick={() => handleDeleteProduct(activeCollection.id, product.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                            </div>
                          </div>
                          <p className="text-lg font-bold text-orange-500">{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg"><p>Vazio.</p></div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // ==========================
          // ABA DE BLOG
          // ==========================
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ... Mesma implementação de Blog anterior, mantida para brevidade ... */}
            <div className="lg:col-span-1 space-y-6">
              <div id="blog-form" className={`bg-white p-6 rounded-lg shadow-sm border ${editingBlogPostId ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-200'} transition-all`}>
                 <h2 className="font-display font-bold text-xl mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {editingBlogPostId ? <Edit2 className="text-orange-500" size={24} /> : <Plus className="text-orange-500" size={24} />}
                    {editingBlogPostId ? 'Editar Post' : 'Novo Post'}
                  </span>
                  {editingBlogPostId && (
                    <button onClick={handleCancelBlogEdit} className="text-xs text-red-500 hover:text-red-700 underline">Cancelar</button>
                  )}
                </h2>

                <form onSubmit={handleSaveBlogPost} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Título</label>
                    <input type="text" value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} placeholder="Ex: Tendências de Verão" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none" required />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Resumo / Conteúdo</label>
                    <textarea value={blogForm.excerpt} onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})} placeholder="Escreva um breve resumo..." className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none h-32 resize-none" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Data</label>
                        <input type="text" value={blogForm.date} onChange={(e) => setBlogForm({...blogForm, date: e.target.value})} placeholder="DD MMM, YYYY" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Autor</label>
                        <input type="text" value={blogForm.author} onChange={(e) => setBlogForm({...blogForm, author: e.target.value})} placeholder="Ex: Via Surf" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                     </div>
                  </div>

                   {/* Upload de Imagem Blog */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Imagem de Capa</label>
                    {blogForm.image && (
                      <div className="mb-3 w-full h-32 bg-gray-100 rounded-lg overflow-hidden relative group border border-gray-200">
                        <img src={blogForm.image} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => { setBlogForm({...blogForm, image: ''}); if(blogFileInputRef.current) blogFileInputRef.current.value = ''; }} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><XCircle size={16} /></button>
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <input type="file" ref={blogFileInputRef} onChange={handleBlogImageUpload} accept="image/*" className="hidden" />
                      <button type="button" onClick={() => blogFileInputRef.current?.click()} className="w-full py-2 px-4 bg-gray-800 text-white rounded flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors text-sm font-bold uppercase"><Upload size={16} /> Enviar Foto</button>
                      <div className="relative flex py-1 items-center"><div className="flex-grow border-t border-gray-200"></div><span className="flex-shrink-0 mx-2 text-gray-300 text-[10px] uppercase">Ou link</span><div className="flex-grow border-t border-gray-200"></div></div>
                      <div className="flex items-center gap-2 border border-gray-300 rounded p-2 bg-white"><ImageIcon size={16} className="text-gray-400" /><input type="text" value={blogForm.image} onChange={(e) => setBlogForm({...blogForm, image: e.target.value})} placeholder="URL da imagem" className="w-full text-xs focus:outline-none" /></div>
                    </div>
                  </div>

                  <button type="submit" className={`w-full ${editingBlogPostId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'} text-white font-bold py-3 rounded transition-colors flex justify-center items-center gap-2`}>
                    <Save size={18} /> {editingBlogPostId ? 'Atualizar Post' : 'Publicar Post'}
                  </button>
                </form>
              </div>
            </div>

            {/* Coluna 2 e 3: Lista de Posts */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-display font-bold text-xl mb-6 border-b border-gray-100 pb-4">
                  Posts Publicados
                </h2>
                {blogPosts.length > 0 ? (
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className={`flex gap-4 items-start border p-4 rounded-lg transition-all bg-white group ${editingBlogPostId === post.id ? 'border-orange-500 ring-1 ring-orange-500 shadow-md' : 'border-gray-100 hover:border-orange-200'}`}>
                        <div className="w-32 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                           <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900 text-lg leading-tight">{post.title}</h3>
                            <div className="flex gap-2">
                              <button onClick={() => handleEditBlogClick(post)} className="text-blue-500 hover:text-blue-700 p-2"><Edit2 size={18} /></button>
                              <button onClick={() => handleDeleteBlogPost(post.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{post.date} • {post.author}</p>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg"><p>Nenhum post no blog.</p></div>
                )}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;