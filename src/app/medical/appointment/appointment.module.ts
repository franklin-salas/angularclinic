import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from '../appointment/appointment.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    AppointmentComponent,
    AddAppointmentComponent,
    EditAppointmentComponent,
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule
  ]
})
export class AppointmentModule { }
