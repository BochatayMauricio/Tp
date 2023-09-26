import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../producto.service';
import { product } from '../../interfaces/productos';
import { AlertComponent } from 'ngx-bootstrap/alert';


@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent implements OnInit{

  //PARTE DEL ALERT
  alerts: any[] = [];

  //FORMULARIO Y USO DE SERVICE
  productForm = new FormGroup({
    model: new FormControl("",Validators.required),
    brand: new FormControl("",Validators.required),
    price: new FormControl(0,Validators.required),
    stock: new FormControl(0,Validators.required),
    description: new FormControl('',Validators.required),
    file: new FormControl(null,Validators.required)
  });
  constructor(private productoS: ProductoService){}

  ngOnInit(): void {

  }

  registrarForm(){
    const producto:product={
      'model':this.productForm.controls.model.value,
      'brand': this.productForm.controls.brand.value,
      'description':this.productForm.controls.description.value,
      'price': this.productForm.controls.price.value,
      'stock': this.productForm.controls.stock.value,
      'date_register': new Date().toLocaleDateString('en-GB'),
      'date_updated': new Date().toLocaleDateString('en-GB'),
      'file': this.productForm.controls.file.value
    }

    this.productoS.postProducto(producto).subscribe({
      complete: ()=> {
        this.productoS.retraiveProducts();
        this.alerts.push({
            type: 'info',
            msg: `Producto registrado correctamente (added: ${new Date().toLocaleTimeString()})`,
            timeout: 2000
          })
      },
      error: (error)=>{
        alert('No se pudo registrar el producto')
        console.log(error)
      }
  });
  }
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}

