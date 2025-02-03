import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';


const routes: Routes = [
  {
    path: '', component: AppointmentComponent,
    children: [
      {
        path: 'add-appointment',
        component: AddAppointmentComponent
      },
      {
        path: 'edit-appointment/:id',
        component: EditAppointmentComponent
      },
      {
        path: 'appointment-list',
        component: AppointmentListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
