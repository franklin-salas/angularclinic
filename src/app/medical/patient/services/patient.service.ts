import { HttpClient,  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public http: HttpClient) { }

  register(data:any):Observable<any>{

    let URL = URL_SERVICIOS+"/patient";
    return this.http.post(URL,data);
  }

  update(data:any, id:number):Observable<any>{
 
    let URL = URL_SERVICIOS+"/patient/"+id;
    return this.http.post(URL,data);
  }

  list(page: number, perPage: number, search: string = '', sortBy: string = '', sortDirection: string = 'asc'): Observable<any> {
    

    let URL = URL_SERVICIOS+"/patient";
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

  get(id:number):Observable<any>{
    let URL = URL_SERVICIOS+"/patient/"+ id;
    return this.http.get<any>(URL);
  }

  delete(id:any){

    let URL = URL_SERVICIOS+"/patient/"+id;
    return this.http.delete(URL);
  }

}
