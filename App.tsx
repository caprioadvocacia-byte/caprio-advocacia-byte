import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductsSection from './components/ProductsSection';
import AboutSection from './components/AboutSection';
import BlogSection from './components/BlogSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import InstagramButton from './components/InstagramButton';
import ReleasesManager from './components/ReleasesManager';
import { BRAND_LOGO } from './constants';
import { ReleaseCategory } from './types';

const App: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState(BRAND_LOGO);
  
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'releases'>('home');
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Releases Data State (Lifted here to persist between views)
  const [releaseCategories, setReleaseCategories] = useState<ReleaseCategory[]>([]);

  const handleNavigateToReleases = () => {
    window.scrollTo(0, 0);
    setCurrentView('releases');
  };

  const handleNavigateToHome = () => {
    window.scrollTo(0, 0);
    setCurrentView('home');
  };

  // Smart Navigation: Handles switching views and scrolling to sections
  const handleHeaderNavigation = (href: string) => {
    // Check if it's an anchor link (starts with #)
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      
      if (currentView !== 'home') {
        // If we are not home, switch view first
        setCurrentView('home');
        // Wait a tiny bit for React to render the Home view, then scroll
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // If already home, just scroll
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // If there is a query, ensure we are on home and scroll to products
    if (query.trim()) {
      handleHeaderNavigation('#produtos');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        logoUrl={logoUrl} 
        onLogoUpdate={setLogoUrl} 
        onNavigate={handleHeaderNavigation}
        onSearch={handleSearch}
      />
      
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            <Hero />
            <Features />
            <ProductsSection 
              onNavigateToReleases={handleNavigateToReleases} 
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
            <AboutSection />
            <ReviewsSection />
            <BlogSection />
          </>
        ) : (
          <ReleasesManager 
            categories={releaseCategories} 
            onUpdateCategories={setReleaseCategories}
            onBack={handleNavigateToHome}
          />
        )}
      </main>

      <Footer logoUrl={logoUrl} />
      
      <InstagramButton />
      <WhatsAppButton />
    </div>
  );
};

export default App;