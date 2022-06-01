import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

export interface Transaction {
  id: number;
  accountNumber: number;
  trxAmount: number;
  description: string;
  trxDate: string;
  trxTime: string;
  customerId: string;
}

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  transaction: Transaction[] = [];
  displayedColumns: string[] = ['id', 'accountNumber', 'trxAmount', 'description', 'trxDate', 'trxTime', 'customerId'];
  dataSource = new MatTableDataSource<Transaction>();
  globalFilter = '';
  accountNumberFilter = new FormControl();
  descriptionFilter = new FormControl();
  customerIdFilter = new FormControl();

  filteredValues = {
      id: '', accountNumber: '', trxAmount: '',
      description: '', trxDate: '', trxTime: '',
      customerId: ''
    };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private app: AppService, private http: HttpClient, private router: Router) { }

  authenticated() {
    if(!this.app.authenticated) {
      this.router.navigateByUrl('/');
    }
    return this.app.authenticated;
  }

  ngOnInit() {
    this.http.get<Transaction[]>('/transaction/all').subscribe((res) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });

    this.accountNumberFilter.valueChanges.subscribe((accountNumberFilterValue) => {
          this.filteredValues['accountNumber'] = accountNumberFilterValue;
          this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.descriptionFilter.valueChanges.subscribe((descriptionFilterValue) => {
              this.filteredValues['description'] = descriptionFilterValue;
              this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.customerIdFilter.valueChanges.subscribe((customerIdFilterValue) => {
              this.filteredValues['customerId'] = customerIdFilterValue;
              this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();

  }

 applyFilter(filter) {
     this.globalFilter = filter;
     this.dataSource.filter = JSON.stringify(this.filteredValues);
 }

 customFilterPredicate() {
     const myFilterPredicate = (data: Transaction, filter: string): boolean => {
       var globalMatch = !this.globalFilter;
       var localMatch = !this.globalFilter;

       if (this.globalFilter) {
         globalMatch =
         data.id.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
         data.accountNumber.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
         data.trxAmount.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
         data.description.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
         data.trxDate.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
         data.trxTime.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
         data.customerId.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
       }

       if (!globalMatch) {
         return globalMatch;
       }

       let searchString = JSON.parse(filter);
       localMatch = data.accountNumber.toString().trim().indexOf(searchString.accountNumber) !== -1 &&
       data.description.toString().trim().toLowerCase().indexOf(searchString.description.toLowerCase()) !== -1 &&
       data.customerId.toString().trim().toLowerCase().indexOf(searchString.customerId.toLowerCase()) !== -1;
       return localMatch
     }
     return myFilterPredicate;
 }

}
