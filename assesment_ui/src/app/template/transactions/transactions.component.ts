import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private app: AppService, private http: HttpClient) { }

  authenticated() {
    return this.app.authenticated;
  }

  ngOnInit() {
    this.http.get<Transaction[]>('/transaction/all').subscribe((res) => {
    console.log(res);
    this.dataSource.data = res;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  public doFilter = (event: Event) => {
      const filterValue: string = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    }

}
