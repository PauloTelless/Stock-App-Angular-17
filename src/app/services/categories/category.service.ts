import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/category/category';
import { enviroment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API_URL = enviroment.API_URL;

  constructor(private httpClient: HttpClient) { }

  getAllCategory(): Observable<Array<Category>>{
    return this.httpClient.get<Array<Category>>(`${this.API_URL}categoriasprodutos`);
  };

  postCategory(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(`${this.API_URL}categorias`, category);
  };

  putCategory(categoriaId: string, categoria: Category): Observable<Category>{
    return this.httpClient.put<Category>(`${this.API_URL}categorias/${categoriaId}`, categoria)
  };

  deleteCategory(categoryId: string): Observable<Category>{
    return this.httpClient.delete<Category>(`${this.API_URL}categorias/${categoryId}`);
  };
}
