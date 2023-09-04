import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { alimento } from 'src/app/models/alimento';
import { ProductoService } from 'src/app/services/productos/producto.service';


@Component({
  selector: 'app-dialog-actualizar-bebida',
  templateUrl: './dialog-actualizar-bebida.component.html',
  styleUrls: ['./dialog-actualizar-bebida.component.scss']
})
export class DialogActualizarBebidaComponent implements OnInit{
  constructor(private fb: FormBuilder, private toastr: ToastrService, private productService: ProductoService) {
    this.reactiveForm();
  }

  idProducto: String;
  productoForm: FormGroup;
  extras: FormArray;
  selectedFile: any = null;
  imageneProducto: string;
  arrAlimentos: any[];
  tipoProducto:String;

  ngOnInit(): void {
    this.productoForm.addControl('extras', this.extras);
    this.productService.diparadoActualizarProducto.subscribe(data => {
      this.idProducto = data.target.id;
      this.recogerInformacion(this.idProducto)
    });    
  }

  reactiveForm() {
    this.productoForm = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
    });
    this.extras = this.fb.array([]);
  }

  previewIMG(event: any): void {
    const input = event.target as HTMLInputElement;
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
            this.toastr.warning("La imagen no tiene el tamaño adecuado.", "Debe ser mayor a 200px");
          } else if (img.height != img.width) {
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

  modificarProducto() {
    let formDataProducto = new FormData();
    formDataProducto.append('nombre', this.productoForm.get('nombre')?.value);
    formDataProducto.append('precio', this.productoForm.get('precio')?.value);
    this.productService.getProduct$.subscribe((data) => {
      let tipoAlimento = data.filter(e=>e._id == this.idProducto);
      formDataProducto.append('tipoAlimento', tipoAlimento[0].tipoAlimento as any);
    })
    formDataProducto.append('imagen', this.imageneProducto);    
    this.productService.modificarProducto(this.idProducto, formDataProducto).subscribe(data => {
      this.productService.modificarLista(data["alimentos"])
    });
  }

  onAddRow() {
    this.extras.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    this.extras.removeAt(rowIndex);
  }

  imagenesChange(event) {
    for (let index = 0; index < event.target.files.length; index++) {
      this.imageneProducto = event.target.files[index];
    }
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      nombre: null,
      precio: null
    });
  }

  recogerInformacion(id: String) {
    this.arrAlimentos = [];
    this.productService.getProduct$.subscribe(data => {
      this.arrAlimentos = data.filter(e => e._id == id);
      this.tipoProducto = this.arrAlimentos[0]?.tipoAlimento;      
      this.productoForm.get('nombre').patchValue(this.arrAlimentos[0]?.nombre);
      this.productoForm.get('precio').patchValue(this.arrAlimentos[0]?.precio);
      this.productoForm.get('imagen').patchValue(this.arrAlimentos[0]?.imagen);
      document.getElementById('img-bebida')?.setAttribute('src', this.arrAlimentos[0]?.imagen as string);
    })
  }

}
