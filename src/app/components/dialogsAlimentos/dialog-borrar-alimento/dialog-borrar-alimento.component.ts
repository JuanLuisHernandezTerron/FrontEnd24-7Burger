import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-borrar-alimento',
  templateUrl: './dialog-borrar-alimento.component.html',
  styleUrls: ['./dialog-borrar-alimento.component.scss']
})
export class DialogBorrarAlimentoComponent {
  constructor(private dialogRef: MatDialogRef<DialogBorrarAlimentoComponent>){}

  resultado = Boolean(false)
  
  confirmDelete() {
    this.resultado = true
    this.dialogRef.close(this.resultado);
  }
}
