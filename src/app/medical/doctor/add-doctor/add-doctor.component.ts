import { Component, OnInit } from '@angular/core';
import { RolesService } from '@modules/roles/services/roles.service';
import { routes } from '@shared/routes/routes';
import { DoctorService } from '../services/doctor.service';
import { showAlertError, sweet } from '@shared/utils/sweet.util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SpecialtyService } from '@modules/specialty/services/specialty.service';


interface ScheduleItem {
  id: number;
  hour_start: string;
  hour_end: string;
  selected: boolean;
}
interface ScheduleDay{
  day: string;
  item: ScheduleItem[];
}

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {

  public routes = routes;

  public avatarURL:any='assets/img/user.jpg';

  public form:FormGroup = new FormGroup({});
  public selectedRole: any[] = [];
  public selectedSpecialty: any[] = []; 

  public day_week = [
    {
      name: 'Lunes',
      color: 'table-primary'
    },
    {
      name: 'Martes',
      color: 'table-secondary'
    },
    {
      name: 'Miercoles',
      color: 'table-success'
    },
    {
      name: 'Jueves',
      color: 'table-warning'
    },
    {
      name: 'Viernes',
      color: 'table-info'
    }

  ];
  schedules: { [key: string]: { [key: string]: ScheduleItem[] } } = {};

  public hours_days:any = [];


  constructor(private roleSevice: RolesService,
              private doctorService: DoctorService,
              private specialtyService: SpecialtyService,
              private fromBuilder: FormBuilder,
              public router: Router
  ){

  }

 

  ngOnInit(): void {

    this.buildFormFields();

    this.roleSevice.selectRolesListDoctor().subscribe({
    next:({data}: any) => {
        this.selectedRole = data;
        
    },
    error:(error:any)=> {
      showAlertError(error);
    }
  });

  this.specialtyService.selectSpecialtyList().subscribe({
    next:({data}: any) => {
        this.selectedSpecialty = data;
    },
    error:(error:any)=> {
      showAlertError(error);
    }
  });

  this.doctorService.getScheduleHours().subscribe({
    next:({data}) => {
      this.hours_days = data;
      console.log(data)
      this.organizeSchedules(data);
      // console.log(this.schedules)
    },
    error:(error:any)=> {
      showAlertError(error);
    }
  });
  
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
    specialty_id: ['', [Validators.required]],
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
      formData.append('schedule_hours',JSON.stringify(this.getSelectedItems()));
    console.log(JSON.stringify(this.getSelectedItems()))
    this.doctorService.register(formData).subscribe( 
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
          this.router.navigate([routes.doctorList]);
        });
       
      },
      error: error => {
        
        showAlertError(error);
      }
     }
    );

  }
  
  organizeSchedules(data:any[]) {
    data.forEach((item)=> {
      if (!this.schedules[item.hour]) {
        this.schedules[item.hour] = {};
      }
    
      this.day_week.forEach(day => {
        if (!this.schedules[item.hour][day.name]) {
          this.schedules[item.hour][day.name] = [];
          
        }

        item.items.forEach( (hours:any) => {
          this.schedules[item.hour][day.name].push({ ...hours, selected: false });  
        })
      
  

      })
    });
  }

  toggleSelection(day: string, hour: string) {
    const hourItems = this.schedules[hour][day];
    const allSelected = hourItems.every(item => item.selected);
      // hourItems.forEach(item => item.selected = !allSelected);
    
    return allSelected;
  }

  onSelection($event:any, day: string, hour: string){
    const hourItems = this.schedules[hour][day];
    if( $event.currentTarget.checked){
      hourItems.forEach(element => {
        element.selected = true;
       });
    }else{
      hourItems.forEach(element => {
        element.selected = false;
       });
    }

    
  }
  onSelectionAll($event:any, hour: string){

    Object.keys(this.schedules[hour]).forEach(day => {
      const hourItems = this.schedules[hour][day];
      if( $event.currentTarget.checked){
        hourItems.forEach(element => {
          element.selected = true;
         });
      }else{
        hourItems.forEach(element => {
          element.selected = false;
         });
      }
    });
  }

  toggleAllSelection(hour: string) {
    let allSelected = false;
 
    for (let day of Object.keys(this.schedules[hour])) {
      const hourItems = this.schedules[hour][day];
      if (hourItems) {
        allSelected = hourItems.every(item => item.selected);
        if (!allSelected) {
          break;
        }
      }
    }
    return allSelected;
   
    
  }

  getDays( hour: string): string[] {
    return Object.keys(this.schedules[hour]);
  }
  
  getHours(): string[] {
   
    return Object.keys(this.schedules);
  }
  
  allSelected(day: string, hour: string): boolean {
    return this.schedules[hour][day].every(item => item.selected);
  }

  getSelectedItems(): any {
    let selectedItems: any = {};

    Object.keys(this.schedules).forEach(hour => {
      Object.keys(this.schedules[hour]).forEach(day => {
        const items = this.schedules[hour][day].filter(item => item.selected);
        if(items.length>0){
          if(!selectedItems[day]){
            selectedItems[day] = [];
          }
          selectedItems[day] = selectedItems[day].concat(items); 
        }
      });
    });
    // let items:any[] = [];
    // Object.keys(selectedItems).forEach(day => {
      
    // items.push({day:day , items: selectedItems[day] })
    // });


    return selectedItems;
  }
}
