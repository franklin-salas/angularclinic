import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from '@shared/routes/routes';
import { SpecialtyService } from '../services/specialty.service';
import { Router } from '@angular/router';
import { showAlertError, sweet } from '@shared/utils/sweet.util';

@Component({
  selector: 'app-add-specialty',
  templateUrl: './add-specialty.component.html',
  styleUrls: ['./add-specialty.component.scss']
})
export class AddSpecialtyComponent implements OnInit {
  public routes = routes;

  public form:FormGroup = new FormGroup({});

  constructor(
              private specialtyService: SpecialtyService,
              private fromBuilder: FormBuilder,
              public router: Router
  ){

  }


  ngOnInit(): void {

    this.buildFormFields();
  
}

get f() {
  return this.form.controls;
}

private buildFormFields() {
  this.form =  this.fromBuilder.group({
    name: ['', [Validators.required,,Validators.maxLength(255)]],
    status: ['', [Validators.required]],

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


    this.specialtyService.registerSpecialty(this.form.value).subscribe( 
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
