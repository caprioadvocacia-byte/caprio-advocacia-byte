import { Product, BlogPost, Review } from './types';

// SVG Data URI representing the "Via Surf" logo with Kangaroo motif
// Black background, White text/graphics designed to work with mix-blend-mode in Header
export const BRAND_LOGO = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3E%3Crect width='500' height='500' fill='black'/%3E%3Ctext x='50%25' y='35%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Brush Script MT, cursive' font-size='130' font-style='italic' letter-spacing='2'%3EVia%3C/text%3E%3Cpath d='M80,240 Q250,225 420,240 Q250,255 80,240 Z' fill='white' /%3E%3Cpath d='M100,320 C100,320 140,290 160,270 C165,265 170,250 170,250 L180,260 L175,270 C175,270 190,280 185,290 C180,300 170,300 170,310 C170,320 190,315 200,315 L190,325 C180,330 180,350 200,360 L220,360 L210,370 C200,380 160,380 140,350 C120,320 100,320 100,320 Z' fill='white' /%3E%3Ctext x='65%25' y='65%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Brush Script MT, cursive' font-size='130' font-style='italic' letter-spacing='2'%3ESurf%3C/text%3E%3C/svg%3E`;

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Prancha Performance Shortboard',
    category: 'Surf',
    price: 2499.00,
    image: 'https://picsum.photos/400/500?random=1',
    isNew: true
  },
  {
    id: '2',
    name: 'Hoodie Oversized Urban',
    category: 'Street',
    price: 289.90,
    image: 'https://picsum.photos/400/500?random=2'
  },
  {
    id: '3',
    name: 'Skate Completo Pro Series',
    category: 'Street',
    price: 650.00,
    image: 'https://picsum.photos/400/500?random=3'
  },
  {
    id: '4',
    name: 'Wetsuit 3/2mm Flex',
    category: 'Surf',
    price: 1200.00,
    image: 'https://picsum.photos/400/500?random=4',
    isNew: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Guia: Escolhendo a Prancha Ideal',
    excerpt: 'Iniciante ou avançado? Descubra qual volume e litragem funcionam melhor para o seu peso e nível de surf.',
    date: '15 Out 2023',
    category: 'Dicas de Surf',
    image: 'https://picsum.photos/600/400?random=10'
  },
  {
    id: '2',
    title: 'Tendências Streetwear 2024',
    excerpt: 'O retorno do estilo Y2K e as modelagens oversized que estão dominando as ruas das capitais.',
    date: '10 Out 2023',
    category: 'Tendências de Streetwear',
    image: 'https://picsum.photos/600/400?random=11'
  },
  {
    id: '3',
    title: 'Review: Wetsuit HyperFlex 3/2',
    excerpt: 'Testamos a nova roupa de borracha na água gelada do sul. Confira se vale o investimento.',
    date: '05 Out 2023',
    category: 'Reviews de Produtos',
    image: 'https://picsum.photos/600/400?random=12'
  },
  {
    id: '4',
    title: 'Via Surf Open: O que rolou',
    excerpt: 'Os melhores momentos e manobras do campeonato que parou a Praia Mole neste fim de semana.',
    date: '01 Out 2023',
    category: 'Eventos da Comunidade',
    image: 'https://picsum.photos/600/400?random=13'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Gabriel Medina Cover',
    rating: 5,
    comment: 'A prancha chegou super bem embalada e o acabamento é de outro mundo. Já botei na água e flui muito!',
    date: 'há 2 dias'
  },
  {
    id: '2',
    name: 'Letícia Bufoni Fan',
    rating: 5,
    comment: 'Comprei o kit de roupas pro rolê de skate. Tecido de qualidade absurda e caimento perfeito. Recomendo demais.',
    date: 'há 1 semana'
  },
  {
    id: '3',
    name: 'Carlos "Tubarão"',
    rating: 4,
    comment: 'Atendimento nota 10 no suporte. Tive dúvida sobre o tamanho e me ajudaram na hora. O envio foi rápido.',
    date: 'há 3 semanas'
  }
];

export const NAV_LINKS = [
  { label: 'Início', href: '#hero' },
  { label: 'Lançamentos', href: '#produtos' },
  { label: 'Reviews', href: '#avaliacoes' },
  { label: 'Journal', href: '#blog' },
];