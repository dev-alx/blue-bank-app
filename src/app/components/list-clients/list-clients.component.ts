import { Component, OnInit } from '@angular/core';
import { cliente } from './../../interfaces/cliente';
import { ClientService } from './../../services/client.service';
import { ErrorService } from './../../services/error.service';
import { user } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit { 

  showLoading = true;
   listaCliente : cliente[] = [];
  constructor(private _clientService : ClientService
    , private _errorService : ErrorService
    , private _loginService : AuthenticationService
    , private router : Router) {

   }

  ngOnInit(): void {
    this.getClientes();  
  }

  getClientes(){
    this._clientService.getListClient().subscribe(data => {
      this.showLoading = false;
      this.listaCliente = data;
      this._loginService.setisAuthenticate(true);
    }, error => { 
      this.showLoading = false; 
      console.log(error.status);
      if (error.status === 401) {
        this._errorService.setError('Inicie Sesion Nuevamente Por Favor');    
        localStorage.removeItem('token');
        this._loginService.setisAuthenticate(false);
        this.router.navigate(['/login']);        
      }
      else
        this._errorService.setError('Se produjo un error al intentar obtener la informacion');      
    });    
  }
}

