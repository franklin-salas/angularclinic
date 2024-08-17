import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from '@shared/routes/routes';
import { SpecialtyService } from '../services/specialty.service';
import { ActivatedRoute, Router } from '@angular/router';
import { showAlertError, sweet } from '@shared/utils/sweet.util';
import { Specialty } from '@shared/models/specialty.model';

@Component({
  selector: 'app-edit-specialty',
  templateUrl: './edit-specialty.component.html',
  styleUrls: ['./edit-specialty.component.scss']
})
export class EditSpecialtyComponent implements OnInit {
  
  public routes = routes;
  public form:FormGroup = new FormGroup({});

  constructor(
              private specialtyService: SpecialtyService,
              private fromBuilder: FormBuilder,
              public router: Router,
              public activedRoute: ActivatedRoute
  ){

  }


  ngOnInit(): void {

    this.buildFormFields();
  
    this.activedRoute.params.subscribe(
      {
        next: (resp:any) => {
          this.form.get('id')?.setValue(resp.id);
          this.specialtyService.getSpecialty(resp.id).subscribe({
            next: ({data}) => {
              console.log({data})
              this.loadFormFields(data);
            },
            error: (error) => {
              showAlertError(error);
            }
           
          })
          
          /// activeRoute
        },
        error: error => {
          console.log({error});
      
          
        }
       }
    );

}

get f() {
  return this.form.controls;
}

private buildFormFields() {
  this.form =  this.fromBuilder.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required,,Validators.maxLength(255)]],
    status: ['', [Validators.required]],

  });

}

protected loadFormFields(data: Specialty| null) {
  
  if(!data) return;

  this.form.patchValue({
    id: data.id,
    name: data.name,
    status: data.status, 
  });

}

  onCancel(){
    this.router.navigate([routes.specialtyList])
  }

  formSubmit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const {id , ...specialty} = this.form.value;
    console.log(specialty);
    this.specialtyService.updateSpecialty(specialty,id).subscribe( 
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
          this.router.navigate([routes.specialtyList]);
        });
       
      },
      error: error => {
        
        showAlertError(error);
      }
     }
    );

  }
  
  
}
