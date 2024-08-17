import { Component, OnInit } from '@angular/core';
import { RolesService } from '@modules/roles/services/roles.service';
import { routes } from '@shared/routes/routes';
import { StaffService } from '../services/staff.service';
import { showAlertError, sweet } from '@shared/utils/sweet.util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Staff } from '@shared/models/staff.model';



@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent  implements OnInit{

  public routes = routes;

  public avatarURL:any='assets/img/user.jpg';
  public avatar_file:any;

  public form:FormGroup = new FormGroup({});

  constructor(private roleSevice: RolesService,
              private staffService: StaffService,
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
          this.staffService.getStaff(resp.id).subscribe({
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




    this.roleSevice.selectRolesListStaff().subscribe({
    next:({data}: any) => {
      // console.log(resp);
        console.log("Retrasado por 3 segundo.");
        this.selectedList1 = data;
  
     
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
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required,Validators.maxLength(150)]],
    document: ['', [Validators.maxLength(50)]],
    mobile: ['', [Validators.required,Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(6)]],
    confirm_password: ['', [Validators.minLength(6)]],
    birth_date: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    education: ['', [Validators.required,Validators.maxLength(255)]],
    designation: ['', [Validators.required]],
    role_id: ['', [Validators.required]],
    address: ['', [Validators.required,Validators.maxLength(255)]],
    avatar: ['', []],
    
    
    // status: ['', [ Validators.required]], , disabled:true

  });

}

protected loadFormFields(data: Staff| null) {
  
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
    education: data.education,
    designation: data.designation,
    role_id: data.role_id,
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
    this.router.navigate([routes.staffList])
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
        if(key !== "password" && key !== "confirm_password" && key !== "avatar" && key !== "id")
          formData.append(key, this.form.get(key)?.value);
      });

      if(!!this.f['password'].value){
        formData.append('password',this.f['password'].value);
        formData.append('confirm_password',this.f['confirm_password'].value);
      }

      if(!!this.f['avatar'].value){
        formData.append('avatar',this.avatar_file);
        
      }  

      console.log(this.f['avatar'].value);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    this.staffService.updateStaff(formData,this.f['id'].value).subscribe( 
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
