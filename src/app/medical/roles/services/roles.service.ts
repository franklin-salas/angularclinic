import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@shared/auth/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private headers:any;

  constructor(public http: HttpClient, public authService: AuthService) { 
    this.headers =  new HttpHeaders({
      'Authorization': 'Bearer '+ this.authService.getToken()
    });
  }

  listRoles(){  
    let URL = URL_SERVICIOS+"/roles";
    return this.http.get(URL,{headers: this.headers});
  }
  showRoles(roleId:number){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.getToken()});
    let URL = URL_SERVICIOS+"/roles/"+roleId;
    return this.http.get(URL,{headers: headers});
  }
  storeRoles(data:any){

    let URL = URL_SERVICIOS+"/roles";
    return this.http.post(URL,data,{headers: this.headers});
  }

  updateRoles(data:any, id:number){

 
    let URL = URL_SERVICIOS+"/roles/"+id;
    return this.http.put(URL,data,{headers: this.headers});
  }

  deleteRoles(roleId:any){

    let URL = URL_SERVICIOS+"/roles/"+roleId;
    return this.http.delete(URL,{headers: this.headers});
  }

  selectRolesListStaff(){  
    const URL = URL_SERVICIOS+"/roles/role-list-staff";
    return this.http.get(URL,{headers: this.headers});
  }

  selectRolesListDoctor(){  
    const URL = URL_SERVICIOS+"/roles/role-list-doctor";
    return this.http.get(URL,{headers: this.headers});
  }
}
