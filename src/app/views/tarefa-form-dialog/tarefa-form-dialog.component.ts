import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tarefa-form-dialog',
  templateUrl: './tarefa-form-dialog.component.html',
  styleUrls: ['./tarefa-form-dialog.component.css']
})
export class TarefaFormDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TarefaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name:"", animal:""},
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


