import { resolve } from 'node:path';
import { env } from 'process';
import { enviroment } from './../environments/environments';
import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../models/user/user';
import { PostUser } from '../models/user/postUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = enviroment.API_URL;

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<Array<user>>{
    return this.httpClient.get<Array<user>>(`${this.API_URL}users`);
  }

  getUser(usuarioId: string){
    return this.httpClient.get<user>(`${this.API_URL}auth/${usuarioId}`);
  }

  postUser(usuario: PostUser): Observable<PostUser>{
    return this.httpClient.post<PostUser>(`${this.API_URL}api/userscreated`, usuario);
  }

}
