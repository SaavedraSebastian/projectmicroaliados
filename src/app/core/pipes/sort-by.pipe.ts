import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  standalone: true // si estás usando standalone components
})
export class SortByPipe implements PipeTransform {
  transform(array: any[], column: string, direction: 'asc' | 'desc' = 'asc'): any[] {
    if (!array || !column) return array;

    return [...array].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
