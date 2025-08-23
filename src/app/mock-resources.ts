export interface Resource {
  id: number;
  title: string;
  type: 'PDF' | 'Video' | 'Article'; // The type of the resource
  author: string;
  url: string; // A link to the resource
  categoryId: number;
}

export const RESOURCES: Resource[] = [
  {
    id: 101,
    title: 'Angular Official Documentation',
    type: 'Article',
    author: 'Google',
    url: 'https://angular.dev/',
    categoryId: 301,
  },
  {
    id: 102,
    title: 'Advanced TypeScript Concepts',
    type: 'Video',
    author: 'Net Ninja',
    url: 'https://www.youtube.com/watch?v=2pdp9-K17m4',
    categoryId: 302,
  },
  {
    id: 103,
    title: 'The Official Tailwind CSS Guide',
    type: 'Article',
    author: 'Tailwind Labs',
    url: 'https://tailwindcss.com/docs',
    categoryId: 303,
  },
];
