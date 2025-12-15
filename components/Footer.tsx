import React from 'react';
import { Instagram, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  logoUrl: string;
}

const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  // Google Maps Search Query
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Av.+Senador+Salgado+Filho,+1800,+Viamão+-+RS";

  return (
    <footer className="bg-street-900 text-gray-300 pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Adjusted grid columns from 4 to 3 since Shop Links were removed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <a href="#" className="block w-40 mb-6">
              <img 
                src={logoUrl} 
                alt="Via Surf" 
                className="w-full h-auto object-contain mix-blend-screen opacity-90"
              />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              A loja mais completa para quem vive o lifestyle do surf e skate. Equipamentos premium, atendimento especializado e vibe garantida.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/viasurf_/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-6">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a 
                  href={mapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-street-accent transition-colors group"
                >
                  <MapPin size={18} className="text-street-accent shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <span>Av. Senador Salgado Filho, 1800 - Loja 02<br />Santa Cecilia, Viamão - RS<br />CEP 94475-000</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-street-accent shrink-0" />
                <span>+55 51 3444-3574</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-street-accent shrink-0" />
                <span>viasurfviamao@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="flex flex-col h-full">
             <h4 className="font-bold text-white uppercase tracking-wider mb-6">Localização</h4>
             <div className="flex-1 rounded-lg overflow-hidden bg-gray-800 min-h-[200px] border border-gray-700">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://maps.google.com/maps?q=Av.%20Senador%20Salgado%20Filho%2C%201800%2C%20Viam%C3%A3o%20-%20RS&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  title="Localização Via Surf"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                ></iframe>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 Via Surf. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Termos de Uso</a>
            <a href="#" className="hover:text-white">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;