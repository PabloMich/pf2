import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busqueda'
})
export class BusquedaPipe implements PipeTransform {

  transform(productos:any,search:any) {
    if(!search){

      return productos;

    }else{

      return productos.filter(producto=>{
        return producto.nombreProducto.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
