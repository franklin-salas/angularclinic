import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  constructor(public http: HttpClient) { }

  registerSpecialty(data:any):Observable<any>{

    let URL = URL_SERVICIOS+"/specialty";
    return this.http.post(URL,data);
  }

  updateSpecialty(data:any, id:number):Observable<any>{
 
    let URL = URL_SERVICIOS+"/specialty/"+id;
    return this.http.put(URL,data);
  }

  listSpecialty(page: number, perPage: number, search: string = '', sortBy: string = '', sortDirection: string = 'asc'): Observable<any> {
    

    let URL = URL_SERVICIOS+"/specialty";
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

  getSpecialty(id:number):Observable<any>{
    let URL = URL_SERVICIOS+"/specialty/"+ id;
    return this.http.get(URL);
  }

  deleteSpecialty(id:any){

    let URL = URL_SERVICIOS+"/specialty/"+id;
    return this.http.delete(URL);
  }

  selectSpecialtyList(): Observable<any>{  
    const URL = URL_SERVICIOS+"/specialty/specialty-list";
    return this.http.get<any>(URL);
  }
}
