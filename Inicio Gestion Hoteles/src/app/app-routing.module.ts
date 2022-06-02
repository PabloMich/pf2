import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {EmpresasComponent} from './components/empresas/empresas.component'
import {LoginComponent} from './components/login/login.component'
import {RegistroComponent} from './components/registro/registro.component'
import {InicioComponent} from './components/inicio/inicio.component'
import { ProductosComponent } from './components/productos/productos.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'inicio', component: InicioComponent},
  {path:'empresas', component: EmpresasComponent},
  {path:'sucursales',component: SucursalesComponent},
  {path:'productos',component: ProductosComponent},
  {path:'**', component:InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
