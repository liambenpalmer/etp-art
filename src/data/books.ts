export interface Book {
  id: string;
  title: string;
  year: number;
  authors: string[];
  description: string;
  price: number;
  buyLink: string;
  images: string[];
  publisher?: string;
  isbn?: string;
  pages?: number;
  available: boolean;
  featured?: boolean;
}

export const books: Book[] = [
  {
    id: 'alphabet',
    title: 'Alphabet',
    year: 2024,
    authors: ['Ellie Tsatsou-Palmer'],
    description: 'A visual exploration through the alphabet, combining photography and artistic interpretation.',
    price: 0,
    buyLink: '',
    images: [
      '/AlphabetBook_EllieTsatsou_HR_001.jpg',
      '/AlphabetBook_EllieTsatsou_HR_002.jpg',
      '/AlphabetBook_EllieTsatsou_HR_003.jpg',
      '/AlphabetBook_EllieTsatsou_HR_004.jpg',
      '/AlphabetBook_EllieTsatsou_HR_005.jpg',
      '/AlphabetBook_EllieTsatsou_HR_006.jpg',
      '/AlphabetBook_EllieTsatsou_HR_007.jpg',
      '/AlphabetBook_EllieTsatsou_HR_008.jpg',
      '/AlphabetBook_EllieTsatsou_HR_009.jpg',
      '/AlphabetBook_EllieTsatsou_HR_010.jpg',
      '/AlphabetBook_EllieTsatsou_HR_011.jpg',
      '/AlphabetBook_WhitelightEditions_Store_HR-43.jpg',
      '/AlphabetBook_WhitelightEditions_Store_HR-45.jpg'
    ],
    available: true,
    featured: true
  },
  {
    id: 'a-family-you-choose',
    title: 'A Family You Choose',
    year: 2024,
    authors: ['Ellie Tsatsou-Palmer'],
    description: 'An intimate collection exploring themes of chosen family and connection.',
    price: 0,
    buyLink: '',
    images: [
      '/AFYC_BookPhotos_HR-5.jpg',
      '/AFYC_BookPhotos_HR-4.jpg',
      '/AFYC_BookPhotos_HR-9.jpg',
      '/AFYC_BookPhotos_HR-12.jpg',
      '/AFYC_BookPhotos_HR-15.jpg',
      '/AFYC_BookPhotos_HR-18.jpg',
      '/AFYC_BookPhotos_HR-22.jpg',
      '/AFYC_BookPhotos_HR-25.jpg',
      '/AFYC_BookPhotos_HR-26.jpg',
      '/AFYC_BookPhotos_HR-27.jpg',
      '/AFYC_BookPhotos_HR-34.jpg',
      '/AFYC_BookPhotos_HR-37.jpg',
      '/AFYC_BookPhotos_HR-40.jpg',
      '/AFYC_BookPhotos_HR-42.jpg',
      '/AFYC_BookPhotos_HR-48.jpg',
      '/AFYC_BookPhotos_HR-49.jpg'
    ],
    available: true,
    featured: true
  },
  {
    id: 'from-the-path-the-water',
    title: 'From The Path The Water',
    year: 2024,
    authors: ['Ellie Tsatsou-Palmer'],
    description: 'A journey through landscapes and waterscapes, capturing the essence of natural pathways.',
    price: 0,
    buyLink: '',
    images: [
      '/placeholder.svg'
    ],
    available: true,
    featured: true
  }
];

export const getFeaturedBooks = () => books.filter(book => book.featured);
export const getAvailableBooks = () => books.filter(book => book.available);
export const getBookById = (id: string) => books.find(book => book.id === id);
