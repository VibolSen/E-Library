export interface Category {
  id: number;
  name: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 201,
    name: 'Science Fiction',
    description: 'Fiction based on imagined future scientific or technological advances.',
  },
  {
    id: 202,
    name: 'Programming',
    description: 'Books related to software development and computer science.',
  },
  {
    id: 203,
    name: 'Fantasy',
    description: 'Fiction in a fictional universe, often inspired by real world myth and folklore.',
  },
  {
    id: 204,
    name: 'Productivity',
    description: 'Resources focused on improving efficiency and personal growth.',
  },
];
