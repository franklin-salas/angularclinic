import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';

const routes: Routes = [
  {
    path: '', component: DoctorComponent,
    children: [
      {
        path: 'add-doctor',
        component: AddDoctorComponent
      },
      {
        path: 'edit-doctor/:id',
        component: EditDoctorComponent
      },
      {
        path: 'doctor-list',
        component: DoctorListComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
