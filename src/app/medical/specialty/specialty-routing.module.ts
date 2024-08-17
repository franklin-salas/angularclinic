import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialtyComponent } from './specialty.component';
import { AddSpecialtyComponent } from './add-specialty/add-specialty.component';
import { EditSpecialtyComponent } from './edit-specialty/edit-specialty.component';
import { SpecialtyListComponent } from './specialty-list/specialty-list.component';

const routes: Routes = [
  {
    path: '', component: SpecialtyComponent,
    children: [
      {
        path: 'add-specialty',
        component: AddSpecialtyComponent
      },
      {
        path: 'edit-specialty/:id',
        component: EditSpecialtyComponent
      },
      {
        path: 'specialty-list',
        component: SpecialtyListComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialtyRoutingModule { }
