import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { transaccion } from './../../interfaces/transaccion';
import { TransactionService } from './../../services/transaction.service';
import { ErrorService } from './../../services/error.service';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  form : FormGroup;
  identificacion : string;
  cuenta : string;
  tipoMovimiento : any;
  movimiento : string;
  titulo : string;

  constructor(private fb : FormBuilder
    , private _transaccionService : TransactionService
    , private aRoute : ActivatedRoute
    , private router : Router
    , private _errorService : ErrorService
    , private _loginService : AuthenticationService) { 
    this.identificacion = this.aRoute.snapshot.paramMap.get('id');
    this.cuenta = this.aRoute.snapshot.paramMap.get('id1');  
    this.tipoMovimiento = this.aRoute.snapshot.paramMap.get('id2');   

    this.form = this.fb.group({
      monto : ['', [Validators.required,Validators.minLength(1)]]
    });

    if (this.tipoMovimiento === "0") {
      this.movimiento = "Consignacion";
      this.titulo = "Deposito a Cuenta";
    }else {
      this.movimiento = "Retiro";
      this.titulo = "Retiro de Cuenta";
    }
  }

  ngOnInit(): void {
  }

  guardar(){    
    const nuevaTransaccion : transaccion = {
      movementType : +this.tipoMovimiento,
      amount : this.form.get('monto').value,
      account : this.cuenta,
      recordDate : new Date
    }
    
    this._transaccionService.saveTransaction(nuevaTransaccion).subscribe(data => {
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


