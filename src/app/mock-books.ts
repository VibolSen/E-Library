export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string; // <-- Add this property
  categoryId: number;
}

export const BOOKS: Book[] = [
  {
    id: 1,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    coverImage: 'https://picsum.photos/id/12/200/300',
    description:
      'A hilarious science fiction adventure following the last surviving man from Earth.',
    categoryId: 201,
  },
  {
    id: 2,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://picsum.photos/id/25/200/300',
    description:
      'An astronaut wakes up to find himself the sole survivor on a mission to save humanity.',
    categoryId: 201,
  },
  {
    id: 3,
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://picsum.photos/id/30/200/300',
    description:
      'A science fiction masterpiece set in a distant future amidst a huge interstellar empire, where a young nobleman becomes embroiled in a complex struggle for control of the desert planet Arrakis and its valuable resource, spice.',
    categoryId: 203,
  },
  {
    id: 4,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    coverImage: 'https://picsum.photos/id/42/200/300',
    description:
      'A handbook of agile software craftsmanship, focusing on writing clean, maintainable code.',
    categoryId: 202,
  },
];
