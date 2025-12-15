export interface Exhibition {
  id: string;
  title: string;
  year: number;
  startDate: string;
  endDate: string;
  venue: string;
  location: string;
  description: string;
  type: 'solo' | 'group';
  image?: string;
  featured?: boolean;
  current?: boolean;
}

export const exhibitions: Exhibition[] = [
  // Example exhibition entry - replace with actual data
  // {
  //   id: 'exh-001',
  //   title: 'Example Exhibition',
  //   year: 2025,
  //   startDate: '2025-01-15',
  //   endDate: '2025-03-30',
  //   venue: 'Gallery Name',
  //   location: 'City, Country',
  //   description: 'Description of the exhibition...',
  //   type: 'solo',
  //   image: '/exhibitions/example-exhibition.jpg',
  //   featured: true,
  //   current: true
  // }
];

export const getFeaturedExhibitions = () => exhibitions.filter(exh => exh.featured);
export const getCurrentExhibitions = () => exhibitions.filter(exh => exh.current);
export const getPastExhibitions = () => exhibitions.filter(exh => !exh.current);
export const getSoloExhibitions = () => exhibitions.filter(exh => exh.type === 'solo');
export const getGroupExhibitions = () => exhibitions.filter(exh => exh.type === 'group');
