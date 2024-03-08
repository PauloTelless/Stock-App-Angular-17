import { enviroment } from '../../environments/environments';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { RegisterUser } from '../../models/user/postUser';
import { TokenResponse } from '../../models/user/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = enviroment.API_URL;

  constructor(private httpClient: HttpClient) {}

  postUser(usuario: RegisterUser): Observable<RegisterUser>{
    return this.httpClient.post<RegisterUser>(`${this.API_URL}auth/register`, usuario);
  }

  loginUser(usuario: User): Observable<TokenResponse>{
    return this.httpClient.post<TokenResponse>(`${this.API_URL}auth/login`, usuario);
  }

  deleteUser(usuarioNome: string): Observable<any>{
    return this.httpClient.delete(`${this.API_URL}Auth/deleteUser/${usuarioNome}`);
  }
}
