import { Product } from '../../models/products/product';
import { HttpClient, withFetch } from '@angular/common/http';
import { APP_ID, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environments/environments';
import { Category } from '../../models/category/category';
import { ProductsCategories } from '../../models/products/productsCategories';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  API_URL = enviroment.API_URL;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Array<Product>>{
    return this.httpClient.get<Array<Product>>(`${this.API_URL}produtos`);
  };

  getAllProductsCategories(): Observable<Array<ProductsCategories>>{
    return this.httpClient.get<Array<ProductsCategories>>(`${this.API_URL}categoriasprodutos`);
  };

  postProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.API_URL}produtos`, product);
  };

  deleteAllProductsCategory(): Observable<Category>{
    return this.httpClient.get<Category>(`${this.API_URL}categorias/categoriaId/`);
  };

  deleteProduct(productId: string): Observable<Product>{
    return this.httpClient.delete<Product>(`${this.API_URL}produtos/${productId}`);
  };

  putProduct(productId: string, produto: Product): Observable<Product>{
    return this.httpClient.put<Product>(`${this.API_URL}produtos/${productId}`, produto);
  };
}
