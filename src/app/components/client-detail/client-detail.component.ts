import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { movimientos } from './../../interfaces/movimientos';
import { TransactionService } from './../../services/transaction.service';
import { ErrorService } from './../../services/error.service';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  identificacion : string;
  cuenta : string;
  movements : any;

  constructor(private _transaccionService : TransactionService
    , private aRoute : ActivatedRoute
    , private router : Router
    , private _errorService : ErrorService
    , private _loginService : AuthenticationService) { 
    this.identificacion = this.aRoute.snapshot.paramMap.get('id');
    this.cuenta = this.aRoute.snapshot.paramMap.get('id1'); 
    this.getTransactions();   
  }

  ngOnInit(): void {
  }

  getTransactions(){
    this._transaccionService.getListTransactions(this.cuenta).subscribe( data => {      
      this.movements = data;
    }, error => {
      if (error.status === 401) {
        this._errorService.setError('Inicie Sesion Nuevamente Por Favor');    
        localStorage.removeItem('token');
        this._loginService.setisAuthenticate(false);
        this.router.navigate(['/login']);        
      }
      else
        this._errorService.setError('Se produjo un error al intentar obtener la informacion'); 
    })
  }

}

