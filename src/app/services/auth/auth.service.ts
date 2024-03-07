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
  private logged!: boolean;

  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem('token')) {
      this.logged = true
    } else {
      this.logged = false
    }
  }

  postUser(usuario: RegisterUser): Observable<RegisterUser>{
    return this.httpClient.post<RegisterUser>(`${this.API_URL}auth/register`, usuario);
  }

  loginUser(usuario: User): Observable<TokenResponse>{
    return this.httpClient.post<TokenResponse>(`${this.API_URL}auth/login`, usuario);
  }

  loggedIn(){
    console.log(this.logged)
    return this.logged;
  }
}
