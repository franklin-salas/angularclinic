import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from '@shared/routes/routes';

import { Router } from '@angular/router';
import {  sweet } from '@shared/utils/sweet.util';
import { SpecialtyService } from '@modules/specialty/services/specialty.service';
import { ServiceService } from '../services/service.service';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit{
  public routes = routes;

  public form:FormGroup = new FormGroup({});
  public selectedSpecialty: any[] = []; 

  constructor(private specialtyService: SpecialtyService,      
              private serviceService: ServiceService,      
              private fromBuilder: FormBuilder,
              public router: Router
  ){

    this.specialtyService.selectSpecialtyList().subscribe({
      next:({data}: any) => {
          this.selectedSpecialty = data;
      }
    });
  }


  ngOnInit(): void {

    this.buildFormFields();
  
}

get f() {
  return this.form.controls;
}

private buildFormFields() {
  this.form =  this.fromBuilder.group({
    name: ['', [Validators.required,Validators.maxLength(255)]],
    specialty_id: ['', [Validators.required]], ///^(\d{1,3}(\.\d{1,2})?|1000(\.00?)?)$/
    price: ['', [Validators.required,Validators.min(0),Validators.max(1000),Validators.pattern("^-?\\d+(\\.\\d{0,2})?$")]],
    description: ['', [Validators.maxLength(500)]], //^-?\\d+(\\.\\d{0,2})?$
    status: ['', [Validators.required]],

  });

}


  onCancel(){
    this.router.navigate([routes.serviceList])
  }

  formSubmit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }


    this.serviceService.register(this.form.value).subscribe( 
     {
      next: resp => {
        console.log({resp});
        sweet.fire({
          position: "center",
          icon: "success",
          title: resp.message,
          showConfirmButton: true,
          timer: 2500
        }).then((result) => {
          this.router.navigate([routes.serviceList]);
        });
       
      },
    
     }
    );

   }
  
}
