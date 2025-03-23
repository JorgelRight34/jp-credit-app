import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseApiUrl;
  user = signal<User | null>(null);

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{ user: User, token: string }>(this.baseUrl + 'login', { username, password }).pipe(
      tap((data) => {
        this.user.set(data.user);
        localStorage.setItem('accessToken', data.token);
      })
    )
  }

}
