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

  private getDecoratorListByCompanyUrl =
    'http://localhost:5000/decorator/get-decoratorList';

  private actionAppointmentUrl =
    'http://localhost:5000/appointment/action-appointment';

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

  async getAppointments(
    userId: string | null,
    type: string | null
  ): Promise<any> {
    return await this.http
      .post<any>(this.getAppointmentsUrl, { userId: userId, type: type })
      .toPromise();
  }

  async getDecoratorList(companyId: string | null): Promise<any> {
    return await this.http
      .post<any>(this.getDecoratorListByCompanyUrl, { companyId: companyId })
      .toPromise();
  }

  async actionAppointment(
    decoratorId: string,
    appointmentId: string,
    type: string,
    action: string
  ): Promise<any> {
    return await this.http
      .post<any>(this.actionAppointmentUrl, {
        decoratorId: decoratorId,
        appointmentId: appointmentId,
        type: type,
        action: action
      })
      .toPromise();
  }
}
