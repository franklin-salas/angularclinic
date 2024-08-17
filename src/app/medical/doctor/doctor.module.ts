import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from '../doctor/doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    DoctorComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    DoctorListComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
