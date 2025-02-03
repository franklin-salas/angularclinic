import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from '../service/service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { SharedModule } from '@shared/shared.module';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';



@NgModule({
  declarations: [
    ServiceComponent,
    AddServiceComponent,
    EditServiceComponent,
    ServiceListComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    SharedModule,
    
  ],
 
})
export class ServiceModule { }
