import { Component, OnInit } from '@angular/core';
import { RolesService } from '@modules/roles/services/roles.service';
import { routes } from '@shared/routes/routes';
import { StaffService } from '../services/staff.service';
import { showAlertError, sweet } from '@shared/utils/sweet.util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';



@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

  public routes = routes;

  public avatarURL:any='assets/img/user.jpg';

  public form:FormGroup = new FormGroup({});

  constructor(private roleSevice: RolesService,
              private staffService: StaffService,
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
    document: ['', [Validators.maxLength(50)]],
    mobile: ['', [Validators.required,Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]],
    confirm_password: ['', [Validators.required,Validators.minLength(6)]],
    birth_date: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    education: ['', [Validators.required,Validators.maxLength(255)]],
    designation: ['', [Validators.required]],
    role_id: ['', [Validators.required]],
    address: ['', [Validators.required,Validators.maxLength(255)]],
    avatar: ['', [Validators.required]],
   
    
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
    this.router.navigate([routes.staffList])
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

    this.staffService.registerStaff(formData).subscribe( 
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
          this.router.navigate([routes.staffList]);
        });
       
      },
      error: error => {
        
        showAlertError(error);
      }
     }
    );

  }
  
  

  
}
