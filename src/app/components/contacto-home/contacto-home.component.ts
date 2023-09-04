import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacto-home',
  templateUrl: './contacto-home.component.html',
  styleUrls: ['./contacto-home.component.scss']
})
export class ContactoHomeComponent implements OnInit{
  formularioContacto !:FormGroup;
  constructor ( private fb: FormBuilder,private tiendaService:TiendaService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.validacionFormulario();
  }

  validacionFormulario():void{
    this.formularioContacto = this.fb.group({
      nombre: new FormControl('',[Validators.required]),
      apellidos: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      telefono: new FormControl('',[Validators.required, Validators.maxLength(9)]),
      asunto: new FormControl('',[Validators.required]),
      descripcion: new FormControl('',[Validators.required]),
    })
  }

  sendFormulario(){
    let contact = {
      nombre: this.formularioContacto.get('nombre')?.value,
      apellidos: this.formularioContacto.get('apellidos')?.value,
      email: this.formularioContacto.get('email')?.value,
      telefono: this.formularioContacto.get('telefono')?.value,
      asunto: this.formularioContacto.get('asunto')?.value,
      descipcion: this.formularioContacto.get('descripcion')?.value
    }

    this.tiendaService.sendConsulta(contact).subscribe((data)=>{
      if (data.status == 'Consulta Enviada Correctamente') {
        this.toastr.success(data.status);
      }else{
        this.toastr.error(data.status)
      }

    });
  }
}
