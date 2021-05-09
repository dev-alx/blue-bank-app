import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private error$ = new Subject<string>();

  constructor() { }

  setError(message : string){
    this.error$.next(message);
  }

  getError() : Observable<string>{
    return this.error$.asObservable();
  }
}
