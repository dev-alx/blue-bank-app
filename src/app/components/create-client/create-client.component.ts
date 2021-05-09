import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cliente } from 'src/app/interfaces/cliente';
import { ClientService } from './../../services/client.service';
import { ErrorService } from './../../services/error.service';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  form : FormGroup;
  constructor(private fb : FormBuilder
    , private _clienteService : ClientService
    , private router : Router
    , private _errorService : ErrorService
    , private _loginService : AuthenticationService) {
    this.form = this.fb.group({
      nombre : ['', [Validators.required, Validators.minLength(4)]],
      identificacion : ['', [Validators.required, Validators.minLength(4)]],
      monto : ['', [Validators.required,Validators.minLength(1)]]
    });
   }

  ngOnInit(): void {
  }

  guardar(){  
    const nCliente : cliente = {
      fullName : this.form.get('nombre').value,
      socialNumber : this.form.get('identificacion').value,
      initialBalance : this.form.get('monto').value,
      product : ''
    }
    
    this._clienteService.saveClient(nCliente).subscribe(data => {
      this.router.navigate(['/home']);
    }, error => {      
      if (error.status === 401) {
        this._errorService.setError('Inicie Sesion Nuevamente Por Favor');    
        localStorage.removeItem('token');
        this._loginService.setisAuthenticate(false);
        this.router.navigate(['/login']);        
      }
      else if (error.error.errors[0].status == 400) {
        this._errorService.setError(error.error.errors[0].detail);  
      }
      else
        this._errorService.setError('Se produjo un error al intentar enviar la informacion');  
    })
  }
}





