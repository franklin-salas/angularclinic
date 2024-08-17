import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  {
    path: '', component: PatientComponent,
    children: [
      {
        path: 'add-patient',
        component: AddPatientComponent
      },
      {
        path: 'edit-patient/:id',
        component: EditPatientComponent
      },
      {
        path: 'patient-list',
        component: PatientListComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
