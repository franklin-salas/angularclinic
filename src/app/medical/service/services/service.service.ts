import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '@shared/models/service.model';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http: HttpClient) { }

  register(data:Service):Observable<any>{

    let URL = URL_SERVICIOS+"/service";
    return this.http.post(URL,data);
  }

  update(data:Service, id:number):Observable<any>{
 
    let URL = URL_SERVICIOS+"/service/"+id;
    return this.http.put(URL,data);
  }

  list(page: number, perPage: number, search: string = '', sortBy: string = '', sortDirection: string = 'asc'): Observable<any> {
    

    let URL = URL_SERVICIOS+"/service";
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
    let URL = URL_SERVICIOS+"/service/"+ id;
    return this.http.get(URL);
  }

  delete(id:number){

    let URL = URL_SERVICIOS+"/service/"+id;
    return this.http.delete(URL);
  }
}
