import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from '@shared/models/models';
import { ServiceList } from '@shared/models/service.model';
import { routes } from '@shared/routes/routes';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { sweet } from '@shared/utils/sweet.util';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  public routes = routes;
  public serviceList: Array<ServiceList> = [];
  dataSource!: MatTableDataSource<ServiceList>;
  
  public searchDataValue = '';
 
  public pageSize = 5;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;


  private sortBy = 'id';
  private sortDirection = 'desc';

  public from= 0;
  public to= 0;
  constructor(
    private serviceService: ServiceService,
    public router: Router
  ){

  }
  
  ngOnInit() {
   this.getTableData();
  }

  private getTableData(page = 1): void {
  
    this.currentPage = page;
    this.serviceService.list(this.currentPage, this.pageSize, this.searchDataValue, this.sortBy, this.sortDirection).subscribe({
    next:({data, pagination}: any) => {
      this.totalData = pagination.total;
      this.serviceList = data;
      this.from = pagination.from;
      this.to = pagination.to;
      console.log({pagination})
      this.dataSource = new MatTableDataSource<any>(this.serviceList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    },
    error:(error:any)=> {
      // showAlertError(error);
    }}
  );
  }
  


  public searchData(): void {
    this.getTableData();
   
  }

  public sortData(sort: Sort) {

    console.log({sort})
    this.sortBy = sort.active;
    this.sortDirection = sort.direction;
    this.getTableData();
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData(this.currentPage);
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData(this.currentPage);
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData( this.currentPage);
  }

  public updateTable(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.searchDataValue = '';
    this.sortBy = 'id';
    this.sortDirection = 'desc';
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  public onDelete(data:any):void {
 
    sweet.fire({
      icon: "warning",
      title: "Eliminar",
      text: `Estas seguro de eliminar el Servicio : ${data.name} ?`,
      showCancelButton: true,
      background: "#fff",
    }).then((result) => {
 
      if (result.isConfirmed) {
        this.deleteService(data.id)
      } 
    });

  }

  private deleteService(id:number):void {
    this.serviceService.delete(id).subscribe( 
      {
       next: resp => {
        this.updateTable()
      
       },
       error: error => {
        this.updateTable()
         
       }
      }
     )
  }
}
