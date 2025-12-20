import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductsSection from './components/ProductsSection';
import AboutSection from './components/AboutSection';
import BlogSection from './components/BlogSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import AdminPanel from './components/AdminPanel';
import { collections as initialCollections, initialBlogPosts } from './constants';
import { Collection, BlogPost } from './types';

function App() {
  // Estado para gerenciar os dados da loja dinamicamente
  const [shopCollections, setShopCollections] = useState<Collection[]>(initialCollections);
  
  // Estado para gerenciar os posts do blog dinamicamente
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  
  // Estado para o Logo Personalizado (null = usa o padrão)
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  // Estado para o Tamanho do Logo (Desktop) - Padrão 56px (equivale a h-14)
  const [logoHeight, setLogoHeight] = useState<number>(56);
  
  // Estado para controlar a visualização (Site vs Admin)
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Estado para controlar a aba ativa na seção de produtos
  const [activeTabId, setActiveTabId] = useState<string>('');

  // Inicializa a aba ativa com a primeira coleção disponível
  useEffect(() => {
    if (shopCollections.length > 0 && !activeTabId) {
      setActiveTabId(shopCollections[0].id);
    }
  }, [shopCollections, activeTabId]);

  // Função para resetar a visualização (ex: ao clicar em Início)
  const handleHomeClick = () => {
    if (shopCollections.length > 0) {
      setActiveTabId(shopCollections[0].id);
    }
    // Força a rolagem suave para o topo absoluto da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Se estiver no modo Admin, renderiza apenas o painel
  if (isAdminMode) {
    return (
      <AdminPanel 
        collections={shopCollections} 
        onUpdateCollections={setShopCollections}
        blogPosts={blogPosts}
        onUpdateBlogPosts={setBlogPosts}
        onClose={() => setIsAdminMode(false)}
        currentLogo={customLogo}
        onUpdateLogo={setCustomLogo}
        logoHeight={logoHeight}
        onUpdateLogoHeight={setLogoHeight}
      />
    );
  }

  // Visualização normal do site
  return (
    <div className="font-sans text-slate-900 bg-white overflow-x-hidden w-full">
      <Header 
        onToggleAdmin={() => setIsAdminMode(true)} 
        onHomeClick={handleHomeClick}
        customLogo={customLogo}
        logoHeight={logoHeight}
      />
      <main>
        <Hero />
        {/* Passamos o estado da aba e a função de atualização */}
        <ProductsSection 
          collections={shopCollections} 
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
          onOpenAdmin={() => setIsAdminMode(true)}
        />
        <Features />
        <AboutSection />
        <BlogSection posts={blogPosts} />
        <FAQSection />
      </main>
      <Footer customLogo={customLogo} logoHeight={logoHeight} />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}

export default App;