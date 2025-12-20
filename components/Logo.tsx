import React from 'react';

// ==============================================================================
// CONFIGURAÇÃO DO LOGO
// ==============================================================================

// ID extraído do link fornecido: 1dNdiC-pI7Ti_Qr1H9l5V7TUy1yudUnxM
// Convertido para link direto de visualização
const DEFAULT_LOGO_SOURCE = "https://drive.google.com/uc?export=view&id=1dNdiC-pI7Ti_Qr1H9l5V7TUy1yudUnxM"; 

interface LogoProps {
  variant?: 'header' | 'footer';
  className?: string;
  customSource?: string | null;
  customHeight?: number;
}

const Logo: React.FC<LogoProps> = ({ variant = 'header', className = '', customSource, customHeight }) => {
  // Ajuste de altura baseado na localização (Header é menor, Footer é maior)
  // Se customHeight for definido, ignoramos as classes de altura padrão (h-8 md:h-14)
  const defaultSizeClasses = variant === 'header' 
    ? 'h-8 md:h-14' 
    : 'h-12 md:h-24';

  // Usa o logo customizado se existir, senão usa o padrão
  const logoSrc = customSource || DEFAULT_LOGO_SOURCE;

  if (logoSrc) {
    // Se houver altura personalizada:
    // 1. Aplicamos via style inline.
    // 2. Adicionamos max-h no mobile para o header evitar quebra de layout se o user escolher algo gigante.
    const style = customHeight ? { height: `${customHeight}px` } : {};
    
    let imageClasses = className;
    if (customHeight) {
      // Classes base + proteção mobile para header
      imageClasses += ` w-auto object-contain ${variant === 'header' ? 'max-h-12 md:max-h-none' : ''}`;
    } else {
      // Classes padrão com tamanhos tailwind
      imageClasses += ` ${defaultSizeClasses} w-auto object-contain`;
    }

    return (
      <img 
        src={logoSrc}
        alt="Via Surf"
        className={imageClasses}
        style={style}
      />
    );
  }

  // Fallback: Se não houver imagem, mostra o texto estilizado
  return (
    <div className={`font-display font-bold italic tracking-wider whitespace-nowrap ${variant === 'footer' ? 'text-4xl' : 'text-2xl'} ${className}`}>
      <span className="text-white">VIA</span> <span className="text-orange-500">SURF</span>
    </div>
  );
};

export default Logo;