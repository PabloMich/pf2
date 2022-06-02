import { Injectable } from '@angular/core'; //Inyecta los datos al servicio para que se puedan manejar
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entidad } from '../models/entidad.model';

@Injectable({
  providedIn: 'root',
})
export class CRUDAdminService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(public _http: HttpClient) {}

  obtenerEmpresas(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/empresas', {
      headers: headersToken,
    });
  }

  obtenerEmpresaId(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/empresaID/' + id, {
      headers: headersToken,
    });
  }

  agregarEmpresa(modeloEmpresa: Entidad, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloEmpresa);

    return this._http.post(this.url + '/registro', parametros, {
      headers: headersToken,
    });
  }

  editarEmpresa(modeloEmpresa: Entidad, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloEmpresa);

    return this._http.put(
      this.url + '/editar/' + modeloEmpresa._id,
      parametros,
      { headers: headersToken }
    );
  }

  sucursalesEmpresa(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/sucursalesEmpresa/' + id, {
      headers: headersToken,
    });
  }

  eliminarEmpresa(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminar/' + id, {
      headers: headersToken,
    });
  }
}
