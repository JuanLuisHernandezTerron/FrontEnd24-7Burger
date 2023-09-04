import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core'
@Component({
  selector: 'app-dialog-omitir-paso',
  templateUrl: './dialog-omitir-paso.component.html',
  styleUrls: ['./dialog-omitir-paso.component.scss']
})
export class DialogOmitirPasoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOmitirPasoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
    ngOnInit() {
    }
  omitirPaso(){
    this.dialogRef.close(true);
  }
}
