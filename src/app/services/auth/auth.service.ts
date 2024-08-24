import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:5000/auth/login';
  private registerUrl = 'http://localhost:5000/auth/register';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  async register(userData: any): Promise<string> {
    return await this.http
      .post<any>(this.registerUrl, userData)
      .toPromise()
      .then((response) => {
        return response.message;
      })
      .catch((error) => {
        throw error;
      });
  }

  async login(userName: string, password: string): Promise<void> {
    return await this.http
      .post<any>(this.loginUrl, { userName, password })
      .toPromise()
      .then((response) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
