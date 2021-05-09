import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  //private url = 'https://localhost:44339/';
  private url = 'https://az-app-blue-bank-api.azurewebsites.net/';
  private apiUrl = 'api/client';
  

  constructor(private http : HttpClient) { }

  getListClient() : Observable<any>{

    //var token = localStorage.getItem('token');

    // const httpHeaders = new HttpHeaders({
    //   'content-type' : 'application/json',
    //   'Authorization' : `Bearer ${token}`
    // });

    return this.http.get(this.url + this.apiUrl);
  }

  saveClient(client : cliente) : Observable<any>{
    return this.http.post(this.url + this.apiUrl, client);
  }
}
