import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true,
})
export class ImageUrlPipe implements PipeTransform {
  // The base URL of your live server
  private readonly baseServerUrl = 'http://172.104.190.114';
  // Path to a placeholder image in your 'assets' folder
  private readonly placeholder = 'assets/images/placeholder.png';

  transform(value: string | null | undefined): string {
    // If the value is null, empty, or undefined, return the placeholder
    if (!value) {
      return this.placeholder;
    }
    // Otherwise, combine the server URL with the image path
    return this.baseServerUrl + value;
  }
}
