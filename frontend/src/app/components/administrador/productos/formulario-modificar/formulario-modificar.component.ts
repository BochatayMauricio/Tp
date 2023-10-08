import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { product } from '../../interfaces/productos';

@Component({
  selector: 'app-formulario-modificar',
  templateUrl: './formulario-modificar.component.html',
  styleUrls: ['./formulario-modificar.component.scss']
})
export class FormularioModificarComponent implements OnInit{
  constructor( private productoS: ProductoService){}
  @Input() productReceived: any;
  ngOnInit(): void {

  };

  updateProducto(price:any,stock:any,description:any){
    const productModify:product={
      id: this.productReceived.id,
      model:this.productReceived.model,
      brand: this.productReceived.brand,
      price: price.value || this.productReceived.price,
      stock: stock.value || this.productReceived.stock,
      description: description.value || this.productReceived.description,
      date_register:this.productReceived.date_register,
      date_updated: new Date().toLocaleDateString('en-GB')
    }
    this.productoS.updateProduct(productModify).subscribe({
      complete: ()=> this.productoS.retraiveProducts(),
      error: (err)=> alert('No se realizo correctamente la modificacion')
    });
  }
}
