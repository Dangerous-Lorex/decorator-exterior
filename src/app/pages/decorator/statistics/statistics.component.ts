import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-decorator-statistics',
  templateUrl: './statistics.component.html',
  standalone: true,
  imports: [NgApexchartsModule],
})
export class StatisticsComponent implements OnInit {
  private barChart: ApexCharts | undefined;
  private pieChart: ApexCharts | undefined;

  public barChartOptions: any;
  public pieChartOptions: any;

  public chartSeries: any[] = [
    {
      name: 'Home',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Restaurant',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];
  public pieChartSeries: any[] = [];
  public pieChartLabels: any[] = [];

  appointmentList: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.updateChartData();
    this.cdr.detectChanges();
    this.barChartOptions = {
      series: this.chartSeries,
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'Number of jobs per month',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };

    this.pieChartOptions = {
      series: this.pieChartSeries,
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Appointments Distribution of This Month',
      },
      labels: this.pieChartLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    const barChartElement = document.getElementById('barChart');
    const pieChartElement = document.getElementById('pieChart');
    setTimeout(() => {
      this.barChart = new ApexCharts(barChartElement, this.barChartOptions);
      this.pieChart = new ApexCharts(pieChartElement, this.pieChartOptions);
      this.barChart.render();
      this.pieChart.render();
    }, 2000);
  }

  updateChartData(): void {
    this.authService._userData.subscribe((data) => {
      this.commonService.getCompletedList(data.id).then((list) => {
        this.appointmentList = list;
        list.homeAppointInfo?.map((info: any) => {
          let index = new Date(info.updatedAt).getMonth();
          this.chartSeries[0].data[index]++;
        });
        list.restAppointInfo?.map((info: any) => {
          let index = new Date(info.updatedAt).getMonth();
          this.chartSeries[1].data[index]++;
        });
      });
      this.commonService.getJobList(data.id).then((list) => {
        let userList = list.userList;
        let homeList = list.homeAppointInfo;
        let restList = list.restAppointInfo;
        userList.map((data: any, index: any) => {
          this.pieChartSeries[index] = 0;
          this.pieChartLabels[index] = data.firstName + ' ' + data.lastName;
          const currentMonth = new Date().getMonth();
          homeList.map((home: any) => {
            const updatedMonth = new Date(home.updatedAt).getMonth();
            if (home.decoratorId == data._id && currentMonth == updatedMonth)
              this.pieChartSeries[index]++;
          });
          restList.map((rest: any) => {
            const updatedMonth = new Date(rest.updatedAt).getMonth();
            if (rest.decoratorId == data._id && currentMonth == updatedMonth)
              this.pieChartSeries[index]++;
          });
        });
      });
    });
  }
}
