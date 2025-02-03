import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from '@shared/routes/routes';

import { Router } from '@angular/router';
import {  sweet } from '@shared/utils/sweet.util';
import { SpecialtyService } from '@modules/specialty/services/specialty.service';
import { DoctorList } from '@shared/models/doctor.model';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from '@shared/models/models';
import { DoctorService } from '@modules/doctor/services/doctor.service';
import { Sort } from '@angular/material/sort';
import { AppointmentService } from '../services/appointment.service';
import { schedule } from '../../../shared/models/models';
import { Specialty } from '../../../shared/models/specialty.model';
import * as moment from 'moment';
@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  public routes = routes;

  public form:FormGroup = new FormGroup({});
  public specialtyList: any[] = []; 
  public doctorList: Array<any> = [];
  dataSourceDoctor!: MatTableDataSource<DoctorList>;

  public searchDataValue = '';
 
  public pageSizeDoctor = 5;
  public totalDataDoctor = 0;
  public skipDoctor = 0;
  public limitDoctor: number = this.pageSizeDoctor;
  public pageIndexDoctor = 0;

  public currentPageDoctor = 1;
  public pageNumberArrayDoctor: Array<number> = [];
  public pageSelectionDoctor: Array<pageSelection> = [];
  public totalPagesDoctor = 0;


  private sortByDoctor = 'id';
  private sortDirectionDoctor = 'desc';

  public fromDoctor= 0;
  public toDoctor= 0;

  public hourList:any = [];
  constructor( private specialtyService: SpecialtyService,
              // private doctorService: DoctorService,      
              private appointmentService: AppointmentService,      
              private fromBuilder: FormBuilder,
              public router: Router
  ){

    this.specialtyService.selectSpecialtyList().subscribe({
      next:({data}: any) => {
          this.specialtyList = data;
      }
    });
    this.appointmentService.getHours().subscribe({
      next:({data}:any) => {
        this.hourList = data;
      }
    });
  }


  ngOnInit(): void {
    // this.getTableDataDoctor();
    this.buildFormFields();
  
}

get f() {
  return this.form.controls;
}

private buildFormFields() {
  this.form =  this.fromBuilder.group({
    name: ['', [Validators.required,Validators.maxLength(255)]],
    specialty_id: ['', [Validators.required]], ///^(\d{1,3}(\.\d{1,2})?|1000(\.00?)?)$/
    price: ['', [Validators.required,Validators.min(0),Validators.max(1000),Validators.pattern("^-?\\d+(\\.\\d{0,2})?$")]],
    description: ['', [Validators.maxLength(500)]], //^-?\\d+(\\.\\d{0,2})?$
    status: ['', [Validators.required]],
    date_appointment: ['', [Validators.required]],
    hour_id: ['', [Validators.required]],

  });

}
private getTableDataDoctor(page = 1): void {
  
  this.currentPageDoctor = page;
  const formattedDate = moment(new Date( this.form.get('date_appointment')?.value)).format('YYYY-MM-DD');
  this.appointmentService.doctorSchedule(this.currentPageDoctor, this.pageSizeDoctor, formattedDate,this.form.value.hour_id,this.form.value.specialty_id, this.sortByDoctor, this.sortDirectionDoctor).subscribe({
  next:({data, pagination}: any) => {
    this.totalDataDoctor = pagination.total;
    this.doctorList = data;
    this.fromDoctor = pagination.from;
    this.toDoctor = pagination.to;
 
    this.dataSourceDoctor = new MatTableDataSource<any>(this.doctorList);
    this.calculateTotalPagesDoctor(this.totalDataDoctor, this.pageSizeDoctor);
  },
  error:(error:any)=> {
    // showAlertError(error);
  }}
);
}
public sortDataDoctor(sort: Sort) {

  this.sortByDoctor = sort.active;
  this.sortDirectionDoctor = sort.direction;
  this.getTableDataDoctor();
}
public getMoreDataDoctor(event: string): void {
  if (event == 'next') {
    this.currentPageDoctor++;
    this.pageIndexDoctor = this.currentPageDoctor - 1;
    this.limitDoctor += this.pageSizeDoctor;
    this.skipDoctor = this.pageSizeDoctor * this.pageIndexDoctor;
    this.getTableDataDoctor(this.currentPageDoctor);
  } else if (event == 'previous') {
    this.currentPageDoctor--;
    this.pageIndexDoctor = this.currentPageDoctor - 1;
    this.limitDoctor -= this.pageSizeDoctor;
    this.skipDoctor = this.pageSizeDoctor * this.pageIndexDoctor;
    this.getTableDataDoctor(this.currentPageDoctor);
  }
}

public moveToPageDoctor(pageNumber: number): void {
  this.currentPageDoctor = pageNumber;
  this.skipDoctor = this.pageSelectionDoctor[pageNumber - 1].skip;
  this.limitDoctor = this.pageSelectionDoctor[pageNumber - 1].limit;
  if (pageNumber > this.currentPageDoctor) {
    this.pageIndexDoctor = pageNumber - 1;
  } else if (pageNumber < this.currentPageDoctor) {
    this.pageIndexDoctor = pageNumber + 1;
  }
  this.getTableDataDoctor( this.currentPageDoctor);
}
private calculateTotalPagesDoctor(totalData: number, pageSizeDoctor: number): void {
  this.pageNumberArrayDoctor = [];
  this.totalPagesDoctor = totalData / pageSizeDoctor;
  if (this.totalPagesDoctor % 1 != 0) {
    this.totalPagesDoctor = Math.trunc(this.totalPagesDoctor + 1);
  }
  /* eslint no-var: off */
  for (var i = 1; i <= this.totalPagesDoctor; i++) {
    const limit = pageSizeDoctor * i;
    const skip = limit - pageSizeDoctor;
    this.pageNumberArrayDoctor.push(i);
    this.pageSelectionDoctor.push({ skip: skip, limit: limit });
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
public updateTableDoctor(): void {
  this.pageSelectionDoctor = [];
  this.limitDoctor = this.pageSizeDoctor;
  this.skipDoctor = 0;
  this.currentPageDoctor = 1;
  this.searchDataValue = '';
  this.sortByDoctor = 'id';
  this.sortDirectionDoctor = 'desc';
  this.getTableDataDoctor();
}


private deleteDoctor(id:number):void {
  // this.doctorService.delete(id).subscribe( 
  //   {
  //    next: resp => {
  //     this.updateTableDoctor()
    
  //    },
  //    error: error => {
  //     this.updateTableDoctor()
  //     // showAlertError(error);
      
       
  //    }
  //   }
  //  )
}



  onCancel(){
    this.router.navigate([routes.serviceList])
  }

  formSubmit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }


    // this.serviceService.register(this.form.value).subscribe( 
    //  {
    //   next: resp => {
    //     console.log({resp});
    //     sweet.fire({
    //       position: "center",
    //       icon: "success",
    //       title: resp.message,
    //       showConfirmButton: true,
    //       timer: 2500
    //     }).then((result) => {
    //       this.router.navigate([routes.serviceList]);
    //     });
       
    //   },
    
    //  }
    //);

   }
  

}
