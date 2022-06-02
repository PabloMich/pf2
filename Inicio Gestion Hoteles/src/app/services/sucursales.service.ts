import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sucursales } from '../models/sucursales.model';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class SucursalesService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  public identidad;

  constructor(public _http: HttpClient, public _loginService: LoginService) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  obtenerSucursales(token): Observable<any> {
    var ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verSucursales/' + ID, {
      headers: headersToken,
    });
  }

  obtenerProductos(nombre: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/misProductos/' + nombre, {
      headers: headersToken,
    });
  }

  agregarSucursal(modeloSucursal: Sucursales, token): Observable<any> {
    var ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);

    let parametros = JSON.stringify(modeloSucursal);

    return this._http.post(this.url + '/nuevaSucursal/' + ID, parametros, {
      headers: headersToken,
    });
  }

  obtenerSucursalId(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/idSucursal/' + id, {
      headers: headersToken,
    });
  }

  editarSucursal(modeloSucursal: Sucursales, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloSucursal);

    return this._http.put(
      this.url + '/editarSucursal/' + modeloSucursal._id,
      parametros,
      { headers: headersToken }
    );
  }

  eliminarSucursal(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/eliminarSucursal/' + id, {
      headers: headersToken,
    });
  }

  ventas(nombre: String,token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.put(this.url + '/ventas/' + nombre, {
      headers: headersToken,
    });
  }
}
