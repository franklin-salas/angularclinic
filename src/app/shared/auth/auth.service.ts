import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private user:any;
  private token:any;

  constructor(private router: Router,
    private http:HttpClient
  ) {
    this.getLocalStorage();
  }
  
  public setUser(user : any) {
    this.user = user;
  }

  public setToken(token : any) {
    this.token = token;
  }
  public getUser():any {

    const datoUser = localStorage.getItem("user");
      const userto = JSON.parse(datoUser?datoUser:"");
    return this.user?this.user:userto; 
  }

  public getToken():any {
    return this.token? this.token : localStorage.getItem("token"); 
  }


  public login(email:string , password:string ): Observable<any>{
    // localStorage.setItem('authenticated', 'true');
    // this.router.navigate([routes.adminDashboard]);
    const URL = URL_SERVICIOS +"/auth/login";
    return this.http.post(URL, {email, password})
    .pipe(
      map((auth:any) => {
       return  this.saveLocalStorage(auth);
      }
      ),
      catchError((error:any) => {
        console.log(error);
        return of(undefined);
      })
    );

  }

  private saveLocalStorage(auth:any): boolean{
    if(auth && auth.access_token){
        localStorage.setItem("token", auth.access_token);
        localStorage.setItem("user", JSON.stringify(auth.user));
        localStorage.setItem('authenticated', 'true');
        this.token = auth.access_token;
        this.user = auth.user;
      return true;
    }

    return false;
  }
  private getLocalStorage(){
    if(localStorage.getItem('user') && localStorage.getItem('token')){
      this.token = localStorage.getItem("token");
      const datoUser = localStorage.getItem("user");
      this.user = JSON.parse(datoUser?datoUser:"");
    }else {
      console.log('getLocalStorage false');
      this.token = null; 
      this.user = null; 
    }

  }
  public logout(){
    console.log('logout');
    this.token = null; 
      this.user = null; 
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem('authenticated');
    this.router.navigate([routes.login]);

  }
}
