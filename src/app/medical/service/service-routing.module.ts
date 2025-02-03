import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [
  {
    path: '', component: ServiceComponent,
    children: [
      {
        path: 'add-service',
        component: AddServiceComponent
      },
      {
        path: 'edit-service/:id',
        component: EditServiceComponent
      },
      {
        path: 'service-list',
        component: ServiceListComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
