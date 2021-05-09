import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { user } from './../../interfaces/user';
import { Router } from '@angular/router';
import { ErrorService } from './../../services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;  
  show = false;

  constructor(private fb : FormBuilder
    , private _loginService : AuthenticationService
    , private router : Router
    ,private _errorService : ErrorService) { 
    this.form = this.fb.group({
      usuario : ['', [Validators.required, Validators.minLength(6)]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  login(){
    this.show = true;
    const loginUser : user = {
      userName : this.form.get('usuario').value,
      email : '',
      password : this.form.get('password').value,
    }

    this._loginService.authenticateUser(loginUser).subscribe( data => {
      console.log("token: ",data.token);
      localStorage.setItem('token',data.token);
      this._loginService.setisAuthenticate(true);
      this.router.navigate(['/home']);
    }, error => {
      this.show = true;
      this._errorService.setError("Usuario o Contraseña Incorrectos");
      console.log(error);
    });
  }
}
