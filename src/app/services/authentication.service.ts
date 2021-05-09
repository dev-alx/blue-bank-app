import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from './../interfaces/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticate$ = new Subject<boolean>();
  //private url = 'https://localhost:44339/';
  private url = 'https://az-app-blue-bank-api.azurewebsites.net/';
  private apiUrl = 'api/Authentication/Login/';

  constructor(private http : HttpClient) { }

  authenticateUser(userLogin : user) : Observable<any>{    
      return this.http.post(this.url + this.apiUrl, userLogin);    
  }

  setisAuthenticate(authenticated : boolean){
    this.isAuthenticate$.next(authenticated);
  }

  getisAuthenticate() : Observable<boolean>{
    return this.isAuthenticate$.asObservable();
  }
}
