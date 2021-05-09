import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { transaccion } from './../interfaces/transaccion';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TransactionService{

    //private url = 'https://localhost:44339/';
    private url = 'https://az-app-blue-bank-api.azurewebsites.net/';
    private apiUrl = 'api/AccountMovement/';
    
  
    constructor(private http : HttpClient) { }

    getListTransactions(account : string) : Observable<any>{
        return this.http.get(this.url + this.apiUrl + account);
      }

    saveTransaction(transaccion : transaccion) : Observable<any>{
        return this.http.post(this.url + this.apiUrl, transaccion);

    }
}