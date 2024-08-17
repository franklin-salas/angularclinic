import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModule } from './ngx-bootstrap/ngx-bootstrap.module';
import { CountUpModule } from 'ngx-countup';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { materialModule } from './material.module';
import { NgxEditorModule } from 'ngx-editor';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data/data.service';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './common-component/header/header.component';
import { SidebarComponent } from './common-component/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MedicalSelectComponent } from './components/medical-select/medical-select.component';
import { MedicalSelectMultipleComponent } from './components/medical-select-multiple/medical-select-multiple.component';
import { MedicalSelectSearchComponent } from './components/medical-select-search/medical-select-search.component';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MedicalSelectComponent,
    MedicalSelectMultipleComponent,
    MedicalSelectSearchComponent
  ],
  imports: [
    CommonModule,
    NgxBootstrapModule,
    CountUpModule,
    NgApexchartsModule,
    NgCircleProgressModule.forRoot({
      "radius": 40,
      "space": -10,
      "outerStrokeWidth": 10,
      "innerStrokeWidth": 10,
      "animationDuration": 1000,
      "clockwise": false,
      "startFromZero": false,
      "lazy": false,
      "outerStrokeLinecap":"square",
      "showSubtitle": false,
      "showTitle" : false,
      "showUnits" : false,
      "showBackground" : false
    }),
    SlickCarouselModule,
    materialModule,
    NgxEditorModule,
    FullCalendarModule,
    HttpClientModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectInfiniteScrollModule
    

    
  ],
  exports: [
    CommonModule,
    NgxBootstrapModule,
    CountUpModule,
    NgApexchartsModule,
    NgCircleProgressModule,
    SlickCarouselModule,
    materialModule,
    NgxEditorModule,
    FullCalendarModule,
    HttpClientModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SidebarComponent,
    MedicalSelectComponent,
    MedicalSelectMultipleComponent,
    
  ],
  providers: [
    DataService,
  ]
})
export class SharedModule { }
