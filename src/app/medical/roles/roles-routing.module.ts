import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AddRoleUserComponent } from './add-role-user/add-role-user.component';
import { EditRoleUserComponent } from './edit-role-user/edit-role-user.component';
import { RoleUserListComponent } from './role-user-list/role-user-list.component';

const routes: Routes = [
  {
    path: '', component: RolesComponent,
    children: [
      {
        path: 'add-role-user',
        component: AddRoleUserComponent
      },
      {
        path: 'edit-role-user/:id',
        component: EditRoleUserComponent
      },
      {
        path: 'role-user-list',
        component: RoleUserListComponent
      }
    ]
  }
];
// /roles/edit-role-user

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
