import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private getUserUrl = 'http://localhost:5000/auth/get-user';

  constructor(private http: HttpClient) {}

  async getUser(userName: string): Promise<string> {
    return await this.http
      .post<any>(this.getUserUrl, {userName: userName})
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
