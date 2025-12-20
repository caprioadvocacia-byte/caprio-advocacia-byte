export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  tag?: string;
  description?: string; // Adicionado descrição
}

export interface Collection {
  id: string;
  title: string;
  description?: string;
  products: Product[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}