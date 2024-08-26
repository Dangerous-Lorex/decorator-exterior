import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private getUserListUrl = 'http://localhost:5000/auth/get-user-list';
  private getCompaniesListUrl = 'http://localhost:5000/admin/get-companies';

  constructor(private http: HttpClient) {}

  getUserList(): Observable<any> {
    return this.http.get<any>(this.getUserListUrl);
  }

  getCompaniesList(): Observable<any> {
    return this.http.get<any>(this.getCompaniesListUrl);
  }
}
