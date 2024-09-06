import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

interface JwtPayload {
  userName: string;
  iat: number;
  exp: number;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:5000/auth/login';
  private registerUrl = 'http://localhost:5000/auth/register';
  private changePasswordUrl = 'http://localhost:5000/auth/change-password';
  private tokenKey = 'auth_token';
  public _userData = new BehaviorSubject<any>(null);

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

  async login(userName: string, password: string): Promise<any> {
    try {
      const response = await this.http
        .post<any>(this.loginUrl, { userName, password })
        .toPromise();
      if (response.token) {
        localStorage.setItem(this.tokenKey, response.token);
        // this.loadUserData()
        const decodedToken = jwtDecode<JwtPayload>(response.token);
        this.setUserData(decodedToken);
        return decodedToken.role;
      }
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<any> {
    const response = await this.http
      .post<any>(this.changePasswordUrl, {
        userId: userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
      .toPromise();
    return response;
  }

  setUserData(userData: any): void {
    this._userData.next(userData);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._userData.next(null);
  }

  getUserData(): any {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      this.setUserData(decodedToken);
    }
  }
}
