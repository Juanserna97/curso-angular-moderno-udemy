import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { CategoryService } from '@features/categories/categories.service';
import { ProductsService } from '@features/products/products.service';
import { CategoryButtonComponent } from '../category-button/category-button.component';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [AsyncPipe, CategoryButtonComponent],
  styleUrl: './category-filter.component.scss',
  template: `
    <h2 class="heading">
      <span class="highlight">Popular</span>
      categories
    </h2>
    <ul class="list-container">
      <li>
        <app-categpry-button category="ALL" [(filterCategory)]="selectedCategory"/>
      </li>
       @for (category of categories$ | async; track category){
      <li>
        <app-categpry-button [category]="category" [(filterCategory)]="selectedCategory"/>
      </li>
      }
    </ul>
  `,
})
export class CategoryFilterComponent {
  readonly categories$ = inject(CategoryService).categories$;

  private readonly _productService = inject(ProductsService);
  selectedCategory = signal<string>('all');

  constructor(){
    effect(()=> this._productService.filterProductsByCategory(this.selectedCategory()),{
      allowSignalWrites: true,
    }
  );
  }
}
