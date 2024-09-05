import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private getCompanyUrl = 'http://localhost:5000/auth/get-company';
  private getMaintenanceListUrl =
    'http://localhost:5000/maintenance/get-maintenance-list';
  private actionMaintenanceUrl =
    'http://localhost:5000/maintenance/action-maintenance';
  private getCompletedListUrl =
    'http://localhost:5000/graph/get-completed-list';
  private getJobListUrl = "http://localhost:5000/graph/get-job-list"
  
  constructor(private http: HttpClient) {}

  async getCompany(id: string): Promise<any> {
    return await this.http
      .post<any>(this.getCompanyUrl, { id: id })
      .toPromise();
  }

  async getMaintenanceList(id: string, type: string | null): Promise<any> {
    return await this.http
      .post<any>(this.getMaintenanceListUrl, { userId: id, type: type })
      .toPromise();
  }

  async actionMaintenance(
    id: string,
    appointmentId: string,
    type: string | null,
    action: string
  ): Promise<any> {

    return await this.http
      .post<any>(this.actionMaintenanceUrl, {
        userId: id,
        appointmentId: appointmentId,
        type: type,
        action: action,
      })
      .toPromise();
  }

  async getCompletedList(userId: string): Promise<any> {
    return await this.http
      .post<any>(this.getCompletedListUrl, {userId: userId})
      .toPromise();
  }

  async getJobList(userId: string): Promise<any> {
    let params = new HttpParams()
    .set('userId', userId)
    return await this.http
      .get<any>(this.getJobListUrl, {params})
      .toPromise();
  }
}
