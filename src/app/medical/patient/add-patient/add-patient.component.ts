import { Component, OnInit } from '@angular/core';
import { RolesService } from '@modules/roles/services/roles.service';
import { routes } from '@shared/routes/routes';
import { showAlertError, sweet } from '@shared/utils/sweet.util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PatientService } from '../services/patient.service';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  public routes = routes;

  public avatarURL:any='assets/img/user.jpg';

  public form:FormGroup = new FormGroup({});

  constructor(private roleSevice: RolesService,
              private patientService: PatientService,
              private fromBuilder: FormBuilder,
              public router: Router
  ){

  }
  selectedRole: any[] = [];
 

  ngOnInit(): void {

    this.buildFormFields();

    this.roleSevice.selectRolesListStaff().subscribe({
    next:({data}: any) => {
    
        this.selectedRole = data;
   
     
    },
    error:(error:any)=> {
      showAlertError(error);
    }
  })
  
}

get f() {
  return this.form.controls;
}

private buildFormFields() {
  this.form =  this.fromBuilder.group({
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required,Validators.maxLength(150)]],
    document: ['', [Validators.required,Validators.maxLength(50)]],
    mobile: ['', [Validators.required,Validators.maxLength(20)]],
    email: ['', [ Validators.email]],
    birth_date: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    address: ['', [Validators.required,Validators.maxLength(255)]],
    antecedent_family: ['', [Validators.required,Validators.maxLength(500)]],
    antecedent_allergy: ['', [Validators.required,Validators.maxLength(500)]],
    avatar: ['', []],
 
    
    // status: ['', [ Validators.required]], , disabled:true

  });

}



  onloadFile($event:any){
    const files = $event.target.files;
    if (files.length === 0) {
      this.avatarURL='assets/img/user.jpg';
      this.f['avatar'].setValue('');
      return;
  }

  const mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
      console.log("Only images are supported.");
     
      return;
  }
  this.f['avatar'].setValue(files[0]);
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = (_event) => {
      this.avatarURL = reader.result;
      
  };
  }
  onCancel(){
    this.router.navigate([routes.patientList])
  }

  formSubmit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const formattedDate = moment(new Date( this.form.get('birth_date')?.value)).format('YYYY-MM-DD');
 


    let formData = new FormData();

      Object.keys(this.form.controls).forEach(key => {
          formData.append(key, this.form.get(key)?.value);
      });
      formData.append('birth_date',formattedDate);

    this.patientService.register(formData).subscribe( 
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
          this.router.navigate([routes.patientList]);
        });
       
      },
      error: error => {
        
        showAlertError(error);
      }
     }
    );

  }
  
  
}
