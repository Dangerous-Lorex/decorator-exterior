import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private getUserList = 'http://localhost:5000/auth/get-user-list';

  constructor(private http: HttpClient) {}

  async getUser(): Promise<any> {
    try {
      const response = await this.http
        .get<any>(this.getUserList)
        .toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error; // Re-throw the error to be handled by the caller
    }

    // return await this.http
    //   .get<any>(this.getUserList)
    //   .toPromise()
    //   .then((response) => {
    //     return response;
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });
  }
}
