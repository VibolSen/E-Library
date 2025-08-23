import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../mock-books';

@Pipe({
  name: 'searchFilter',
  standalone: true,
})
export class SearchFilterPipe implements PipeTransform {
  transform(books: Book[], searchTerm: string): Book[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return books;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        book.author.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
}
