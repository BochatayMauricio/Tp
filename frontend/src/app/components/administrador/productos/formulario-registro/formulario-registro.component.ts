import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  productForm:FormGroup;
  constructor(private productoS: ProductoService,public fb: FormBuilder){
    this.productForm = this.fb.group({
      model: [''],
      brand:[''],
      price:[0],
      stock:[0],
      description:[''],
      file: [null]
    });
  }

  ngOnInit(): void {

  }
  uploadFile(event:any){
      const file = (event.currentTarget as HTMLImageElement);
    this.productForm.patchValue({
      file: file,
    });
    this.productForm.get('file')?.updateValueAndValidity();
  }

  registrarForm(){
    var formDataProduct = new FormData();
    formDataProduct.append('model',this.productForm.get('model')?.value);
    formDataProduct.append('brand',this.productForm.get('brand')?.value);
    formDataProduct.append('price',this.productForm.get('price')?.value);
    formDataProduct.append('stock',this.productForm.get('stock')?.value);
    formDataProduct.append('description',this.productForm.get('description')?.value);
    formDataProduct.append('file',this.productForm.get('file')?.value);


    this.productoS.postProducto(formDataProduct).subscribe({
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

