import { HttpClient,  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(public http: HttpClient) { }

  registerStaff(data:any):Observable<any>{

    let URL = URL_SERVICIOS+"/staff";
    return this.http.post(URL,data);
  }

  updateStaff(data:any, id:number):Observable<any>{
 
    let URL = URL_SERVICIOS+"/staff/"+id;
    return this.http.post(URL,data);
  }

  listStaff(page: number, perPage: number, search: string = '', sortBy: string = '', sortDirection: string = 'asc'): Observable<any> {
    

    let URL = URL_SERVICIOS+"/staff";
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) {
      params = params.set('search', search);
    }
    if (sortBy) {
      params = params.set('sort_by', sortBy);
      params = params.set('sort_direction', sortDirection);
    }

    return this.http.get<any>(URL, { params });
  }

  getStaff(id:number):Observable<any>{
    let URL = URL_SERVICIOS+"/staff/"+ id;
    return this.http.get(URL);
  }

  deleteStaff(id:any){

    let URL = URL_SERVICIOS+"/staff/"+id;
    return this.http.delete(URL);
  }
}
