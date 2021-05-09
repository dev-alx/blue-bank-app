import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { HttpCustomInteceptor } from './interceptor/http-custom-interceptor';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { ErrorComponent } from './shared/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,    
    ListClientsComponent,
    SpinnerComponent,
    NavBarComponent,    
    CreateClientComponent, ClientDetailComponent, CreateTransactionComponent, ErrorComponent, LoginComponent, FooterComponent
  ],
  imports: [
  
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCustomInteceptor,    
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,    
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
