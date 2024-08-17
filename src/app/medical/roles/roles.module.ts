import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from '../roles/roles.component';
import { AddRoleUserComponent } from './add-role-user/add-role-user.component';
import { EditRoleUserComponent } from './edit-role-user/edit-role-user.component';
import { RoleUserListComponent } from './role-user-list/role-user-list.component';
// import { materialModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
// import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RolesComponent,
    AddRoleUserComponent,
    EditRoleUserComponent,
    RoleUserListComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    // materialModule
    // FormsModule,
    // ReactiveFormsModule,
    // HttpClientModule,
  ]
})
export class RolesModule { }
