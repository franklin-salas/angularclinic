import { HttpClient,  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(public http: HttpClient) { }

  register(data:any):Observable<any>{

    let URL = URL_SERVICIOS+"/appointment";
    return this.http.post(URL,data);
  }

  update(data:any, id:number):Observable<any>{
 
    let URL = URL_SERVICIOS+"/appointment/"+id;
    return this.http.post(URL,data);
  }

  doctorSchedule(page: number, perPage: number, date_appointment: string = '',hour_id:string ='',specialty_id:string ='', sortBy: string = '', sortDirection: string = 'asc'): Observable<any> {
    

    let URL = URL_SERVICIOS+"/appointment/filter";
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (date_appointment) {
      params = params.set('date_appointment', date_appointment);
      params = params.set('hour_id', hour_id);
      params = params.set('specialty_id', specialty_id);
    }
    if (sortBy) {
      params = params.set('sort_by', sortBy);
      params = params.set('sort_direction', sortDirection);
    }

    return this.http.get<any>(URL, { params });
  }

  get(id:number):Observable<any>{
    let URL = URL_SERVICIOS+"/doctor/"+ id;
    return this.http.get<any>(URL);
  }

  getHours():Observable<any>{
    let URL = URL_SERVICIOS+"/appointment-hour/";
    return this.http.get<any>(URL);
  }


  delete(id:any){

    let URL = URL_SERVICIOS+"/doctor/"+id;
    return this.http.delete(URL);
  }

  getScheduleHours():Observable<any>{
    let URL = URL_SERVICIOS+"/doctor/schedule-hours";
    return this.http.get<any>(URL);
  }
}
