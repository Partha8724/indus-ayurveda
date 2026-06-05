export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  hoverImage: string;
  category: string;
  isNew?: boolean;
  isLimited?: boolean;
  onSale?: boolean;
}

export const products: Product[] = [
  {
    id: 'p-1',
    title: 'Cellular Renewal Complex',
    price: 14999,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000',
    hoverImage: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=1000',
    category: 'Skincare',
    isNew: true,
  },
  {
    id: 'p-2',
    title: 'Vitality Botanical Elixir',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1608248593853-add12f94b8e0?auto=format&fit=crop&q=80&w=1000',
    hoverImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1000',
    category: 'Supplements',
    isLimited: true,
  },
  {
    id: 'p-3',
    title: 'Immunity Defense Shield',
    price: 6999,
    image: 'https://images.unsplash.com/photo-1584308666744-24d1e2e46b61?auto=format&fit=crop&q=80&w=1000',
    hoverImage: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1000',
    category: 'Nutrition',
  },
  {
    id: 'p-4',
    title: 'Indus Detox Cleanse',
    price: 12499,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1000',
    hoverImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1000',
    category: 'Cleanse',
    onSale: true,
  },
];
