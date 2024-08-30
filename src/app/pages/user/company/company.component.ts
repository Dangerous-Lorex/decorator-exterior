import { Component, OnInit } from "@angular/core";
import { NgFor } from "@angular/common";
import { Router } from "@angular/router";

import { AdminService } from "../../../services/admin/admin.service";

import { NzTableModule } from "ng-zorro-antd/table";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";

interface DataItem {
  name: string;
  location: string;
  serviceList: string;
  locationMap: string;
  recruiters: string;
  decorators: string;
  holidayTerms: string;
}

@Component ({
  selector: "app-user-company",
  templateUrl: "./company.component.html",
  standalone: true,
  imports: [
    NzTableModule,
    NgFor,
    NzButtonModule,
    NzIconModule
  ]
})

export class UserCompanyComponent implements OnInit {

  companyList: any

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.getCompaniesList().subscribe((data) => {
      this.companyList = data
    })
  }

  moveTo(link: string) {
    this.router.navigate(["/user/company/" + link]);
  }

  companyTableHeader = [
    {
      title: 'Name',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Location',
      compare: (a: DataItem, b: DataItem) =>
        a.location.localeCompare(b.location),
      priority: false,
    },
    {
      title: 'Setting',
    },
  ];
}