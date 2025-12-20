import { Collection, BlogPost } from './types';

// ==============================================================================
// GERENCIADOR DE COLEÇÕES (ABAS DE PRODUTOS)
// ==============================================================================

export const collections: Collection[] = [
  {
    id: 'destaques',
    title: 'Destaques',
    description: 'As peças mais exclusivas e desejadas da coleção atual.',
    products: [
      {
        id: 1,
        name: "Prancha Performance Pro",
        price: "R$ 2.499,00",
        image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?q=80&w=800&auto=format&fit=crop",
        category: "Surf",
        tag: "Lançamento",
        description: "Desenvolvida para alta performance em ondas médias. Glassagem reforçada e rabeta squash."
      },
      {
        id: 2,
        name: "Tênis Street Urban",
        price: "R$ 389,90",
        image: "https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=800&auto=format&fit=crop",
        category: "Sneakers",
        tag: "Oferta",
        description: "Solado vulcanizado para maior aderência no skate. Conforto e durabilidade para o dia a dia."
      },
      {
        id: 105,
        name: "Moletom Oversized",
        price: "R$ 259,00",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
        category: "Vestuário",
        description: "Tecido premium com gramatura alta. Modelagem ampla para máximo conforto e estilo."
      }
    ]
  },
  {
    id: 'skate',
    title: 'Skate Shop',
    description: 'Tudo para o seu rolê.',
    products: [
      {
        id: 3,
        name: "Skate Completo Pro",
        price: "R$ 650,00",
        image: "https://images.unsplash.com/photo-1520048063586-a05b810e206f?q=80&w=800&auto=format&fit=crop",
        category: "Street",
        tag: "Best Seller",
        description: "Setup completo com peças importadas."
      },
      {
        id: 101,
        name: "Shape Maple",
        price: "R$ 220,00",
        image: "https://images.unsplash.com/photo-1566576912902-1b98f26034f5?q=80&w=800&auto=format&fit=crop",
        category: "Peças",
        description: "Madeira 100% Maple Canadense."
      }
    ]
  },
  {
    id: 'acessorios',
    title: 'Acessórios',
    description: 'Complete seu visual.',
    products: [
      {
        id: 4,
        name: "Óculos Polarizado",
        price: "R$ 450,00",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
        category: "Acessórios",
        tag: "Promo",
        description: "Proteção UV400 com lentes polarizadas."
      }
    ]
  }
];

// ==============================================================================
// DADOS INICIAIS DO BLOG
// ==============================================================================

export const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Como escolher a prancha de surf ideal para iniciantes",
    excerpt: "Descubra o tamanho e o volume certo para evoluir no surf com segurança e diversão. Guia completo para quem está começando.",
    image: "https://images.unsplash.com/photo-1415650426723-5d51842095f1?q=80&w=800&auto=format&fit=crop",
    date: "12 Out, 2024",
    author: "Equipe Via Surf"
  },
  {
    id: 2,
    title: "Tendências Streetwear: O que está em alta em 2025",
    excerpt: "Do oversize aos acessórios utilitários, veja as peças que não podem faltar no seu guarda-roupa nesta temporada.",
    image: "https://images.unsplash.com/photo-1523396864712-ecc4a4394e21?q=80&w=800&auto=format&fit=crop",
    date: "05 Nov, 2024",
    author: "Moda Urbana"
  },
  {
    id: 3,
    title: "Manutenção de Skate: Aumente a vida útil do seu setup",
    excerpt: "Dicas simples de limpeza de rolamentos e troca de shape para manter seu skate sempre pronto para o rolê.",
    image: "https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?q=80&w=800&auto=format&fit=crop",
    date: "28 Nov, 2024",
    author: "Skate Shop"
  }
];