import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  visible = false;
  suscripcion : Subscription;
  constructor(private router : Router, private _loginService : AuthenticationService) { }

  ngOnInit(): void {
    this.suscripcion = this._loginService.getisAuthenticate().subscribe(data => {
      this.visible = data;
    })
  }

  salir(){
    this.visible = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
