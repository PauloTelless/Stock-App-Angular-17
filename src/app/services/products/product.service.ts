import { Product } from '../../models/products/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL = enviroment.API_URL;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Array<Product>>{
    return this.httpClient.get<Array<Product>>(`${this.API_URL}produtos`);
  }

  postProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.API_URL}produtos`, product);
  }

  deleteProduct(productId: string): Observable<Product>{
    return this.httpClient.delete<Product>(`${this.API_URL}produtos/${productId}`);
  }

  putProduct(productId: string, produto: Product): Observable<Product>{
    return this.httpClient.put<Product>(`${this.API_URL}produtos/${productId}`, produto);
  }
}
