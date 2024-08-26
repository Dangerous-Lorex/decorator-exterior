import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdminService } from '../../../services/admin/admin.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzIconService } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';

interface DataItem {
  name: string;
  location: string;
  serviceList: string;
  locationMap: string;
  recruiters: string;
  decorators: string;
  holidayTerms: string;
}

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
  ],
})
export class ViewCompanyComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private iconService: NzIconService
  ) {
    this.iconService.addIcon(PlusOutline);
  }
  isVisible = false;
  companyList: any;
  ngOnInit(): void {
    this.adminService.getCompaniesList().subscribe((companyList) => {
      this.companyList = companyList;
    });
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
      title: 'Location Map',
      compare: (a: DataItem, b: DataItem) =>
        a.locationMap.localeCompare(b.locationMap),
      priority: false,
    },
    {
      title: 'Setting',
    },
  ];

  addCompanyModal(): void {
    this.isVisible = true;
  }

  companyModalConfirm(): void {
    this.isVisible = false;
  }
}
