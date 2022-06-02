import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { ProductosComponent } from './components/productos/productos.component';
import { BusquedaPipe } from './pipes/busqueda.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpresasComponent,
    InicioComponent,
    NavbarComponent,
    RegistroComponent,
    SucursalesComponent,
    ProductosComponent,
    BusquedaPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
