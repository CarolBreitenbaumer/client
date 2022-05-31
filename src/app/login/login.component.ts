import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";
import {ToastrService} from "ngx-toastr";

interface Response {
  access_token: string;
  is_admin: boolean;
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              private toastr: ToastrService) {
    this.loginForm = this.fb.group({});

  }
  ngOnInit(): void {
    // Formgruppe erstellt
    this.loginForm = this.fb.group({
      username:["",[Validators.required,Validators.email]],
      password:["",Validators.required]
    });
  }

  login(){
    //erhalten alle Werte des Formulars
    const val = this.loginForm.value;
    // wenn useranme und password vorhanden sind
    if(val.username && val.password){
      this.authService.login(val.username, val.password).subscribe((res:any)=>{
          console.log(res);
          //carsten diese Antwort, mit as wandet man Datentyp um
          this.authService.setLocalStorage((res as Response).access_token, (res as Response).is_admin);
          this.router.navigateByUrl("/subjects");
        this.toastr.success("Login","Login erfolgreich");
        }
      )
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }


}
