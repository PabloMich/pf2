import { Component, OnInit } from '@angular/core';
import { Sucursales } from 'src/app/models/sucursales.model';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductosSucursales } from 'src/app/models/productos-sucursales.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css'],
  providers: [SucursalesService, LoginService],
})
export class SucursalesComponent implements OnInit {
  public identidad;
  public getModelo: Sucursales;
  public postModelo: Sucursales;
  public getIdModelo: Sucursales;
  public token;

  public getProductos: ProductosSucursales;

  constructor(
    private _sucursalesService: SucursalesService,
    private _loginService: LoginService
  ) {
    this.postModelo = new Sucursales('', '', '', '');
    this.getIdModelo = new Sucursales('', '', '', '');
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }
  ngOnInit(): void {
    this.getSucursales();
  }

  getProducts(nombre) {
    this._sucursalesService.obtenerProductos(nombre, this.token).subscribe(
      (response) => {
        this.getProductos=response.Mis_productos;
        console.log(response.Mis_productos)
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getSucursales() {
    this._sucursalesService.obtenerSucursales(this.token).subscribe(
      (response) => {
        this.getModelo = response.Mis_sucursales;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  postSucursales(agregarSucursal) {
    this._sucursalesService
      .agregarSucursal(this.postModelo, this.token)
      .subscribe(
        (response) => {
          this.getSucursales();
          agregarSucursal.reset();
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

  getSucursalId(idSucursal) {
    this._sucursalesService.obtenerSucursalId(idSucursal, this.token).subscribe(
      (response) => {
        this.getIdModelo = response.Sucursal_encontrada;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  putSucursales() {
    this._sucursalesService
      .editarSucursal(this.getIdModelo, this.token)
      .subscribe(
        (response) => {
          console.log(response);
          this.getSucursales();
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

  deleteSucursales(idSucursal) {
    this._sucursalesService.eliminarSucursal(idSucursal, this.token).subscribe(
      (response) => {
        console.log(response);
        this.getSucursales();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  ventasProductos(nombre){
    this._sucursalesService.ventas(nombre, this.token).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: response.stockActualizado,
        });
      },(error) => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      }
    )
  }


}
