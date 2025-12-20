import React from 'react';
import { MapPin, Phone, Instagram, Facebook, Mail, ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  customLogo: string | null;
  logoHeight: number;
}

const Footer: React.FC<FooterProps> = ({ customLogo, logoHeight }) => {
  return (
    <footer id="contato" className="bg-black text-gray-300 pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* Brand & Social */}
        <div className="space-y-6">
          {/* Logo do Footer é tipicamente 50% maior que o do Header */}
          <Logo variant="footer" customSource={customLogo} customHeight={Math.round(logoHeight * 1.5)} />
          <p className="text-gray-400 leading-relaxed max-w-sm">
            A referência em surf, skate e streetwear de Viamão. 
            Há mais de 25 anos trazendo as melhores marcas e produtos originais para o seu lifestyle.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/viasurf_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://www.facebook.com/lojasviasurf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Contact Info Styled */}
        <div>
          <h4 className="font-display font-bold text-white text-lg uppercase tracking-wider mb-8 flex items-center gap-2">
            <span className="w-8 h-1 bg-orange-500 inline-block"></span>
            Canais de Atendimento
          </h4>
          
          <div className="space-y-6">
            {/* Endereço */}
            <a 
              href="https://maps.google.com/?q=Av.+Senador+Salgado+Filho,+1800+-+Viamão+-+RS" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 group"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <MapPin size={20} />
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 group-hover:text-orange-500 transition-colors">Loja Física</h5>
                <p className="text-gray-200 font-medium leading-snug">Av. Senador Salgado Filho, 1800</p>
                <p className="text-sm text-gray-500">Loja 02 (Carrefour) - Viamão / RS</p>
              </div>
            </a>

            {/* Telefone */}
            <a 
              href="https://wa.me/555134443574" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start gap-4 group"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-orange-500 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                <Phone size={20} />
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 group-hover:text-green-500 transition-colors">WhatsApp / Telefone</h5>
                <p className="text-gray-200 font-medium tracking-wide">+55 51 3444-3574</p>
                <p className="text-sm text-gray-500">Atendimento horário comercial</p>
              </div>
            </a>

            {/* Email */}
            <a 
              href="mailto:viasurfviamao@gmail.com"
              className="flex items-start gap-4 group"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-orange-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <Mail size={20} />
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 group-hover:text-blue-500 transition-colors">E-mail</h5>
                <p className="text-gray-200 font-medium">viasurfviamao@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="h-full min-h-[250px] rounded-xl overflow-hidden bg-gray-800 relative group border border-gray-800 hover:border-orange-500/50 transition-colors">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://maps.google.com/maps?q=Av.%20Senador%20Salgado%20Filho%2C%201800%2C%20Viam%C3%A3o%20-%20RS&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            title="Localização Via Surf"
            loading="lazy"
          ></iframe>
          
          {/* Overlay Label on Map */}
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-700 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-white uppercase">Venha nos visitar</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 bg-gray-950/50">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} Via Surf. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Termos</span>
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Privacidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;