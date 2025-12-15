export interface Product {
  id: string;
  name: string;
  category: 'Surf' | 'Street' | 'Acessórios';
  price: number;
  image: string;
  isNew?: boolean;
}

export interface ReleaseCategory {
  id: string;
  title: string;
  products: Product[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum SECTION_ID {
  HERO = 'hero',
  PRODUCTS = 'produtos',
  ABOUT = 'sobre',
  BLOG = 'blog',
  REVIEWS = 'avaliacoes',
  CONTACT = 'contato'
}