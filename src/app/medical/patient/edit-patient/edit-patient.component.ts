import { Component, OnInit } from '@angular/core';

import { routes } from '@shared/routes/routes';
import { showAlertError, sweet } from '@shared/utils/sweet.util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PatientService } from '../services/patient.service';
import { Patient } from '@shared/models/patient.model';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  public routes = routes;

  public avatarURL:any='assets/img/user.jpg';
  public avatar_file:any;

  public form:FormGroup = new FormGroup({});

  constructor(
              private staffService: PatientService,
              private fromBuilder: FormBuilder,
              public router: Router,
              public activedRoute: ActivatedRoute
  ){

  }
  selectedList1: any[] = [];
 

  ngOnInit(): void {

    this.buildFormFields();



    this.activedRoute.params.subscribe(
      {
        next: (resp:any) => {
          this.form.get('id')?.setValue(resp.id);
          this.staffService.get(resp.id).subscribe({
            next: ({data}) => {
            
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
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required,Validators.maxLength(150)]],
    document: ['', [Validators.maxLength(50)]],
    mobile: ['', [Validators.required,Validators.maxLength(20)]],
    email: ['', [ Validators.email]],
    birth_date: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    antecedent_family: ['', [Validators.required,Validators.maxLength(500)]],
    antecedent_allergy: ['', [Validators.required,Validators.maxLength(500)]],
    address: ['', [Validators.required,Validators.maxLength(255)]],
    avatar: ['', []],
    
    
    // status: ['', [ Validators.required]], , disabled:true

  });

}

protected loadFormFields(data: Patient| null) {
  
  if(!data) return;
    
  this.avatarURL = data.url_avatar;
  this.form.patchValue({
    id: data.id,
    name: data.name,
    last_name: data.last_name,
    document: data.document,
    email: data.email,
    mobile: data.mobile,
    birth_date:this.dateFormats(data.birth_date,"DD-MM-YYYY","DD/MM/YYYY"),
    gender: data.gender,
    antecedent_family: data.antecedent_family,
    antecedent_allergy: data.antecedent_allergy,
    address: data.address,
    avatar: '',
    
  });

}

dateFormats(dateString: string, inputFormat: string, outputFormat: string): Date {
  const date = moment(dateString, inputFormat);
  const format =  date.format(outputFormat);
  return moment(format,outputFormat).toDate();
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

  this.avatar_file = files[0];
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

    console.log(this.form.controls);

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const formattedDate = moment(new Date( this.form.get('birth_date')?.value)).format('YYYY-MM-DD');
    this.form.get('birth_date')?.setValue(formattedDate);


    let formData = new FormData();


      Object.keys(this.form.controls).forEach(key => {
        if(key !== "avatar" && key !== "id")
          formData.append(key, this.form.get(key)?.value);
      });

      

      if(!!this.f['avatar'].value){
        formData.append('avatar',this.avatar_file);
        
      }  

    

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    this.staffService.update(formData,this.f['id'].value).subscribe( 
     {
      next: (resp:any) => {
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
