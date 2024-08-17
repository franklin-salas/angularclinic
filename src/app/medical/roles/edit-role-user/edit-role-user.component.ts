import { Component, OnInit } from '@angular/core';
import { DataService } from '@shared/data/data.service';
import { RolesService } from '../services/roles.service';
import { routes } from '@shared/routes/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { showAlertError, sweet } from '@shared/utils/sweet.util';

@Component({
  selector: 'app-edit-role-user',
  templateUrl: './edit-role-user.component.html',
  styleUrls: ['./edit-role-user.component.scss']
})
export class EditRoleUserComponent implements OnInit{
  public routes = routes;
  sideBar:any = [];
  public form: FormGroup = new FormGroup({});

  permissions:any = [];
  constructor(  public dataService: DataService,
                public RolesService:RolesService,
                private fromBuilder: FormBuilder,
                public router: Router,
                public activedRoute: ActivatedRoute){
    
  }
  ngOnInit(): void {
    this.sideBar = this.dataService.sideBar[0].menu;
    this.buildFormFields();

    this.activedRoute.params.subscribe(
      {
        next: (resp:any) => {
          this.form.get('idRole')?.setValue(resp.id);
          this.RolesService.showRoles(resp.id).subscribe({
            next: (resp:any) => {
              this.form.get('name')?.setValue(resp.name);
              this.permissions = resp.permision_pluck;
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


  protected buildFormFields() {
   
    this.form =  this.fromBuilder.group({
      name: ['', [Validators.required , Validators.maxLength(255)]],
      idRole: ['', [Validators.required]],
    });
  }
  onCancel(){
    this.router.navigate([routes.roleUserList]);
  }
  
  formSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

      const data = {
        name: this.form.get('name')?.value,
        permisions: this.permissions,
      };
      this.RolesService.updateRoles(data,this.form.get('idRole')?.value).subscribe( 
       {
        next: (resp:any) => {
         
          sweet.fire({
            position: "center",
            icon: "success",
            title: "Editado",
            text:resp.message,
            showConfirmButton: true,
            timer: 3500
          }).then((result) => {
            this.router.navigate([routes.roleUserList]);
          });
        },
        error: error => {
          // console.log({err});
          showAlertError(error);
        }
       }
      );

  }

  addPermission(subMenu:any){
    if(subMenu.permision){
      let index = this.permissions.findIndex((item:any) => item == subMenu.permision);
      if(index != -1){
        this.permissions.splice(index,1);
      }else{
        this.permissions.push(subMenu.permision)
      }
    }
  }


}
