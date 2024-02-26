import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../models/products/product';
import { enviroment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL = enviroment.API_URL;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Array<product>>{
    return this.httpClient.get<Array<product>>(`${this.API_URL}produtos`);
  }

  postProduct(product: product): Observable<product> {
    return this.httpClient.post<product>(`${this.API_URL}produtos`, product);
  }
}
