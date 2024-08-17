import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public passwordClass = false;
  public error = false;

  form = new FormGroup({
    email: new FormControl('test@test.es', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123456', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(public auth: AuthService,  public router: Router) {}
  ngOnInit(): void {
    // if (localStorage.getItem('authenticated')) {
    //   localStorage.removeItem('authenticated');
    // }
  }

  // isValidField(field:string){
  //   return this.f['email'].touched && this.f['email'].invalid
  // }

  loginFormSubmit() {

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    
      this.error = false;
      const email = this.form.value.email ? this.form.value.email : '';
      const password = this.form.value.password ? this.form.value.password : '';

      this.auth.login(email, password).subscribe({
        next: (response) =>{
          if (response) {
                this.router.navigate([routes.adminDashboard]);
              } else {
                // alert('error auth login')
                this.error = true;
              }
        },
        error: (error) =>{
          
          console.log({ error })
        }
      }
      )
      
    
  }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }
}
