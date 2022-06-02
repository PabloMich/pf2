import { Injectable } from '@angular/core';
import { Productos } from '../models/productos.model';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductosSucursales } from '../models/productos-sucursales.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  public identidad;

  constructor(public _http: HttpClient, public _loginService: LoginService) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  obtenerProductos(token): Observable<any> {
    var ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verProductos/' + ID, {
      headers: headersToken,
    });
  }

  agregarProductos(modeloProducto: Productos, token): Observable<any> {
    var ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);

    let parametros = JSON.stringify(modeloProducto);

    return this._http.post(this.url + '/agregarProductos/' + ID, parametros, {
      headers: headersToken,
    });
  }

  enviarProductos(modelo: ProductosSucursales, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modelo);
    return this._http.post(this.url + '/enviarProductos', parametros, {
      headers: headersToken,
    });
  }

  obtenerProductoId(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/productoId/' + id, {
      headers: headersToken,
    });
  }

  editarProducto(modeloProducto: Productos, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloProducto);

    return this._http.put(
      this.url + '/editarProducto/' + modeloProducto._id,
      parametros,
      { headers: headersToken }
    );
  }

  eliminarProductos(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/eliminarProducto/' + id, {
      headers: headersToken,
    });
  }
}
