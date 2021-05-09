import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from './../../services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  texto = '';
  show = false;
  suscripcion : Subscription;

  constructor(private _errorService : ErrorService) { 
    this.suscripcion = this._errorService.getError().subscribe(data => {   
      this.showMessage();
      this.texto = data;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.suscripcion.unsubscribe();
  }

  showMessage(){
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 2000);
  }

}
