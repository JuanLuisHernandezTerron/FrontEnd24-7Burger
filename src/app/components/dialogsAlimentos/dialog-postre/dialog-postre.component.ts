import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/productos/producto.service';

@Component({
  selector: 'app-dialog-postre',
  templateUrl: './dialog-postre.component.html',
  styleUrls: ['./dialog-postre.component.scss']
})
export class DialogPostreComponent {
  
  constructor(private fb: FormBuilder,private toastr: ToastrService, private productService: ProductoService,@Inject('ALERGENOS') public arrAlergenos) {
    this.reactiveForm();
  }
  productoForm: FormGroup;
  extras: FormArray;
  alergenos: FormArray;
  selectedFile: any = null;
  imageneProducto:string;
  alergenosAux = [...this.arrAlergenos];

  ngOnInit(): void {
    this.productoForm.addControl('extras', this.extras);
    this.productoForm.addControl('alergenos', this.alergenos);
    this.alergenosAux.forEach(elemento =>elemento.estado= false)
  }
  

  reactiveForm() {
    this.productoForm = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
    });
    this.alergenos = this.fb.array([]),
    this.extras = this.fb.array([]);
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
            document.getElementById('img-postre')?.setAttribute('src', default_file);
            this.toastr.warning("La imagen no tiene el tamaño adecuado.", "Debe ser mayor a 200px");
          }else if( img.height != img.width){
            this.toastr.warning("La imagen no tiene el tamaño adecuado.", "Debe tener relacion de aspecto 1:1");
          }
           else {
            document.getElementById('img-postre')?.setAttribute('src', e.target?.result as string);

          }
        };
        img.src = e.target.result as string;

      };
      reader.readAsDataURL(file);
    }
  }

  ingresarPostre(){    
    let arrayAlergenosAux = this.alergenosAux.filter(a => a.estado === true)
    arrayAlergenosAux.forEach(a =>{      
      this.alergenos.push(this.fb.group({
        nombre: a.nombre,
        imagen: a.imagen
      }))
    })
    let formDataProducto = new FormData();
    formDataProducto.append('nombre',this.productoForm.get('nombre')?.value);
    formDataProducto.append('precio',this.productoForm.get('precio')?.value);
    formDataProducto.append('descripcion',this.productoForm.get('descripcion')?.value);
    formDataProducto.append('alergenos',JSON.stringify(this.productoForm.get('alergenos')?.value));
    formDataProducto.append('tipoAlimento','Postre');
    formDataProducto.append('imagen',this.imageneProducto);
    formDataProducto.append('extras',JSON.stringify(this.productoForm.get('extras')?.value)); 
    this.productService.ingresarProducto(formDataProducto).subscribe(data=>{console.log(data),
    this.productService.modificarLista(data)});
   }  

  onAddRow() {
    this.extras.push(this.createItemFormGroup());
  }
  
  onRemoveRow(rowIndex:number){
    this.extras.removeAt(rowIndex);
  }

  imagenesChange(event){
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

  cambioEstado(posicion: number){
    this.alergenosAux[posicion].estado == true ? this.alergenosAux[posicion].estado = false : this.alergenosAux[posicion].estado = true;
    
  }
}
