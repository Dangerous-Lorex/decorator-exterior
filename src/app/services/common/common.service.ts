import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private getCompanyUrl = "http://localhost:5000/auth/get-company"

  constructor(private http: HttpClient) {}

  async getCompany(id: string):Promise<any> {
    return await this.http.post<any>(this.getCompanyUrl, {id: id}).toPromise()
  }
}