import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entidad } from 'src/app/models/entidad.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  public modelo: Entidad;

  public identidad;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.modelo = new Entidad('', '', '', '', '', '', '', '');
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {}

  getToken() {
    this._loginService.login(this.modelo, 'true').subscribe(
      (response) => {
        localStorage.setItem('token', response.Token);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerTokenPromesa(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._loginService.login(this.modelo, 'true').subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('token', response.Token);
          resolve(response);
        },
        (error) => {
          console.log(<any>error);
        }
      );
    });
  }

  login() {
    this._loginService.login(this.modelo).subscribe(
      (response) => {
        this.obtenerTokenPromesa().then((respuesta) => {
          localStorage.setItem(
            'identidad',
            JSON.stringify(response.Inicio_exitoso)
          );
          if (response.Inicio_exitoso.rol == 'ADMIN') {
            this._router.navigate(['/empresas']);
          } else {
            this._router.navigate(['/sucursales']);
          }
        });
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      }
    );
  }
}
