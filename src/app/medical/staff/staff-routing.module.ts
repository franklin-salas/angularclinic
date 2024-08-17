import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';


const routes: Routes = [
  {
    path: '', component: StaffComponent,
    children: [
      {
        path: 'add-staff',
        component: AddStaffComponent
      },
      {
        path: 'edit-staff/:id',
        component: EditStaffComponent
      },
      {
        path: 'staff-list',
        component: StaffListComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
