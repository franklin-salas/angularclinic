import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialtyRoutingModule } from './specialty-routing.module';
import { AddSpecialtyComponent } from './add-specialty/add-specialty.component';
import { EditSpecialtyComponent } from './edit-specialty/edit-specialty.component';
import { SpecialtyListComponent } from './specialty-list/specialty-list.component';
import { SharedModule } from '@shared/shared.module';
import { SpecialtyComponent } from '../specialty/specialty.component';


@NgModule({
  declarations: [
    AddSpecialtyComponent,
    EditSpecialtyComponent,
    SpecialtyListComponent,
    SpecialtyComponent
  ],
  imports: [
    CommonModule,
    SpecialtyRoutingModule,
    SharedModule
  ]
})
export class SpecialtyModule { }
