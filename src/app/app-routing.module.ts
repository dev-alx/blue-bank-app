import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientsComponent } from './components/list-clients/list-clients.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component : ListClientsComponent },
  { path: 'home', component : ListClientsComponent },
  { path: 'login', component : LoginComponent },
  { path: 'create', component : CreateClientComponent },
  { path: 'view/:id/:id1', component : ClientDetailComponent },
  { path: 'new/:id/:id1/:id2', component : CreateTransactionComponent },
  { path: '**', redirectTo : '/', pathMatch : 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  




exports: [RouterModule]
})
export class AppRoutingModule { }

