import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private getUserUrl = 'http://localhost:5000/auth/get-user';
  private updateUserUrl = "http://localhost:5000/auth/update-user"

  constructor(private http: HttpClient) {}

  getUser(userName: string): Observable<any> {
    return this.http.post<any>(this.getUserUrl, { userName });
  }

  async updateUser(userInfo: any):Promise<any> {
    let response: any;
    return await this.http.put<any>(this.updateUserUrl, userInfo).toPromise()
  }
}