
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { alimento } from 'src/app/models/alimento';
import { ProductoService } from 'src/app/services/productos/producto.service';

@Component({
  selector: 'app-dialog-bebida',
  templateUrl: './dialog-bebida.component.html',
  styleUrls: ['./dialog-bebida.component.scss']
})
export class DialogBebidaComponent {
  constructor(private fb: FormBuilder,private toastr: ToastrService, private productService: ProductoService) {
    this.reactiveForm();
  }
  productoForm: FormGroup;
  selectedFile: any = null;
  imageneProducto:string;
  ngOnInit(): void {
    
  }
  

  reactiveForm() {
    this.productoForm = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
    });
  }

  previewIMG(event: any): void {
    var booleanAux = false;
    const input = event.target as HTMLInputElement;
    const default_file = "./../../../../assets/imagenes/icone-de-nourriture-hamburger-noir.png";
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        var url = e.target.result;
        img.onload = () => {
            console.log(img.width);
            console.log(img.height);
          if ((img.width < 200)) {
            document.getElementById('img-bebida')?.setAttribute('src', default_file);
            this.toastr.warning("La imagen no tiene el tamaño adecuado.", "Debe ser mayor a 200px");
          }else if( img.height != img.width){
            this.toastr.warning("La imagen no tiene el tamaño adecuado.", "Debe tener relacion de aspecto 1:1");
          }
           else {
            document.getElementById('img-bebida')?.setAttribute('src', e.target?.result as string);

          }
        };
        img.src = e.target.result as string;

      };
      reader.readAsDataURL(file);
    }
  }

  ingresarBebida(){    

    let formDataProducto = new FormData();
    formDataProducto.append('nombre',this.productoForm.get('nombre')?.value);
    formDataProducto.append('precio',this.productoForm.get('precio')?.value);
    formDataProducto.append('tipoAlimento','Bebida');
    formDataProducto.append('imagen',this.imageneProducto); 
    this.productService.ingresarProducto(formDataProducto).subscribe(data=>{console.log(data),
      this.productService.modificarLista(data)});
   }


  


  imagenesChange(event){
    for (let index = 0; index < event.target.files.length; index++) {
      this.imageneProducto = event.target.files[index];
    }
  }


}

