import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private addHomeAppointUrl =
    'http://localhost:5000/appointment/add-home-appointment';
  private addRestAppointUrl =
    'http://localhost:5000/appointment/add-rest-appointment';

  private getAppointmentsUrl =
    'http://localhost:5000/appointment/get-appointment';

  constructor(private http: HttpClient) {}

  async addHomeAppointment(appointment: any): Promise<any> {
    return await this.http
      .post<any>(this.addHomeAppointUrl, appointment)
      .toPromise();
  }

  async addRestAppointment(appointment: any): Promise<any> {
    console.log(appointment);
    return await this.http
      .post<any>(this.addRestAppointUrl, appointment)
      .toPromise();
  }

  async getAppointments(userId: string): Promise<any> {
    return await this.http
      .post<any>(this.getAppointmentsUrl, {userId: userId})
      .toPromise();
  }
}
