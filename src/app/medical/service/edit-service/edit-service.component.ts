import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routes } from '@shared/routes/routes';
import { SpecialtyService } from '../../specialty/services/specialty.service';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { sweet } from '@shared/utils/sweet.util';
import { switchMap } from 'rxjs';
import { Service } from '@shared/models/service.model';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {

  public routes = routes;

  public form:FormGroup = new FormGroup({});
  public selectedSpecialty: any[] = []; 

  constructor(private specialtyService: SpecialtyService,      
              private serviceService: ServiceService,      
              private formBuilder: FormBuilder,
              public router: Router,
              public activedRoute: ActivatedRoute
  ){

    this.specialtyService.selectSpecialtyList().subscribe({
      next:({data}: any) => {
          this.selectedSpecialty = data;
      }
    });
  }


  ngOnInit(): void {

    this.buildFormFields();
    this.activedRoute.params.pipe(
      switchMap( ({ id }) => this.serviceService.get( id )),
    ).subscribe( ({data}) =>{   
              this.loadFormFields(data);   
          })
          
    
}

get f() {
  return this.form.controls;
}

private buildFormFields() {
  this.form =  this.formBuilder.group({
    name: ['', [Validators.required,Validators.maxLength(255)]],
    id: ['', [Validators.required]],
    specialty_id: ['', [Validators.required]], ///^(\d{1,3}(\.\d{1,2})?|1000(\.00?)?)$/
    price: ['', [Validators.required,Validators.min(0),Validators.max(1000),Validators.pattern("^-?\\d+(\\.\\d{0,2})?$")]],
    description: ['', [Validators.maxLength(500)]], //^-?\\d+(\\.\\d{0,2})?$
    status: ['', [Validators.required]],

  });

}

private loadFormFields(data: Service| null) {
  
  if(!data) return;

  this.form.patchValue({
    id: data.id,
    name: data.name,
    status: data.status, 
    description: data.description,
    price:data.price,
    specialty_id: data.specialty_id
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
    const {id , ...service} = this.form.value;

    this.serviceService.update(service, id).subscribe( 
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
