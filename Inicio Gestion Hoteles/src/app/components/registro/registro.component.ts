import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/models/entidad.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [LoginService],
})
export class RegistroComponent implements OnInit {
  public postModelo: Entidad;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.postModelo = new Entidad('', '', '', '', '', '', '', '');
  }

  public tipoEmpresas = [
    { tipo: 'Restaurante' },
    { tipo: 'Distribuidora' },
    { tipo: 'Banco' },
    { tipo: 'Supermercado' },
    { tipo: 'Tecnología' },
    { tipo: 'Bienes raíces' },
  ];

  public municipios = [
    { nombre: 'Amatitlán' },
    { nombre: 'Chinautla' },
    { nombre: 'Chuarrancho' },
    { nombre: 'Ciudad de Guatemala' },
    { nombre: 'Fraijanes' },
    { nombre: 'Mixco' },
    { nombre: 'Palencia' },
    { nombre: 'San José del Golfo' },
    { nombre: 'San José Pinula' },
    { nombre: 'San Juan Sacatepéquez' },
    { nombre: 'San Miguel Petapa' },
    { nombre: 'San Pedro Ayampuc' },
    { nombre: 'San Pedro Sacatepéquez' },
    { nombre: 'San Raymundo' },
    { nombre: 'Santa Catarina Pinula' },
    { nombre: 'Villa Canales' },
    { nombre: 'VillaNueva' },
  ];


  ngOnInit(): void {
    localStorage.clear()
  }

  postEmpresas() {
    this._loginService.registroEmpresa(this.postModelo).subscribe(
      (response) => {
        console.log(response);
        this._router.navigate(['/login']);
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
