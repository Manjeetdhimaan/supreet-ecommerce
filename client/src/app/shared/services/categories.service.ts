import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

export interface CategoriesResponse {
  success: boolean;
  message: string;
  categories: Category[];
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  category: Category;
}

export interface ServerResponse {
  success: boolean,
  message: string,
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryBaseUrl = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) { }

  getCategories():Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${this.categoryBaseUrl}/get-categories`);
  }

  getCategory(categoryId: string):Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.categoryBaseUrl}/get-category/${categoryId}`);
  }

  postCategory(categoryBody: Category):Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.categoryBaseUrl}/post-category`, categoryBody);
  }

  updateCategory(categoryId: string, categoryBody: Category):Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.categoryBaseUrl}/update-category/${categoryId}`, categoryBody);
  }

  deleteCategory(categoryId: string):Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`${this.categoryBaseUrl}/delete-category/${categoryId}`);
  }
}
