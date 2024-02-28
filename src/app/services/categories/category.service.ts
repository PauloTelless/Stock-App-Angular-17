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
    return this.httpClient.get<Array<Category>>(`${this.API_URL}categorias`);
  }
}
