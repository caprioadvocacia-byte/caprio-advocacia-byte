import React from 'react';
import { Instagram } from 'lucide-react';

const InstagramButton: React.FC = () => {
  const instagramUrl = "https://www.instagram.com/viasurf_/";

  return (
    <a 
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 left-6 z-50 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-pink-500/30 flex items-center justify-center"
      aria-label="Siga-nos no Instagram"
    >
      <Instagram size={28} />
    </a>
  );
};

export default InstagramButton;