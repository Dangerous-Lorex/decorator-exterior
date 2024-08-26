import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  public _decoratorList = new BehaviorSubject<any>(null);

  private getUserListUrl = 'http://localhost:5000/auth/get-user-list';
  private getCompaniesListUrl = 'http://localhost:5000/admin/get-companies';
  private registerDecoratorUrl = 'http://localhost:5000/admin/register-decorator';
  private getDecoratorsUrl = 'http://localhost:5000/admin/get-decorators';
  private updateDecoratorUrl = 'http://localhost:5000/decorator/update-decorator'
  private permissionDecoratorUrl = 'http://localhost:5000/admin/decorator-permission'
  private permissionUserUrl = 'http://localhost:5000/admin/user-permission'

  constructor(private http: HttpClient) {}

  getUserList(): Observable<any> {
    return this.http.get<any>(this.getUserListUrl);
  }

  getCompaniesList(): Observable<any> {
    return this.http.get<any>(this.getCompaniesListUrl);
  }

  registerDecorator(userInfo: any): Observable<any> {
    const response =  this.http.post<any>(this.registerDecoratorUrl, userInfo);
    this.getDecoratorList()
    return response
  }

  getDecoratorList(): Observable<any> {
    const response = this.http.get<any>(this.getDecoratorsUrl);
    this.setDecoratorList(response)
    return response
  }

  updateDecorator(decoratorInfo: any): Observable<any> {
    const response = this.http.put<any>(this.updateDecoratorUrl, decoratorInfo)
    this.getDecoratorList()
    return response
  }

  permissionDecorator(userInfo: any): Observable<any> {
    const response = this.http.post<any>(this.permissionDecoratorUrl, userInfo)
    this.getDecoratorList()
    return response
  }

  setDecoratorList(response: any):void {
    this._decoratorList.next(response)
  }

  permissionUser(userInfo: any): Observable<any> {
    const response = this.http.post<any>(this.permissionUserUrl, userInfo)
    this.getDecoratorList()
    return response
  }
}
