import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { pageSelection } from '@shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { showAlertError, sweet } from '@shared/utils/sweet.util';
import { PatientList } from '@shared/models/patient.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  public routes = routes;
  public patientList: Array<PatientList> = [];
  dataSource!: MatTableDataSource<PatientList>;

  public searchDataValue = '';
 
  public pageSize = 5;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  // public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;


  private sortBy = 'id';
  private sortDirection = 'desc';

  public from= 0;
  public to= 0;
  constructor(
    private patientService: PatientService,
    public router: Router
  ){

  }
  ngOnInit() {
   this.getTableData();
  }

  private getTableData(page = 1): void {
  
    this.currentPage = page;
    this.patientService.list(this.currentPage, this.pageSize, this.searchDataValue, this.sortBy, this.sortDirection).subscribe({
    next:({data, pagination}: any) => {
      this.totalData = pagination.total;
      this.patientList = data;
      this.from = pagination.from;
      this.to = pagination.to;
      console.log({pagination})
      this.dataSource = new MatTableDataSource<any>(this.patientList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    },
    error:(error:any)=> {
      showAlertError(error);
    }}
  );
  }
  


  public searchData(): void {

    
    this.getTableData();
 
  }

  public sortData(sort: Sort) {

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
    for (var i = 1; i <= this.totalPages; i++) {
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
      text: `Estas seguro de eliminar el Doctor : ${data.name} ?`,
      showCancelButton: true,
      background: "#fff",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteDoctor(data.id)
      } 
    });

  }

  private deleteDoctor(id:number):void {
    this.patientService.delete(id).subscribe( 
      {
       next: resp => {
        this.updateTable()
      
       },
       error: error => {
        this.updateTable()
        showAlertError(error);
        
         
       }
      }
     )
  }
}
