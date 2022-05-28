import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Coluna } from 'src/model/coluna';
import { Tag } from 'src/model/tag';
import { Tarefa } from 'src/model/tarefa';
import { ColunaService } from 'src/services/coluna.service';
import { TarefaFormDialogComponent } from '../tarefa-form-dialog/tarefa-form-dialog.component';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.css']
})
export class ColunaComponent implements OnInit {

  colunas : Coluna[] | null = null ;

  constructor(private colunaService: ColunaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listar();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(TarefaFormDialogComponent, {
      width: '30%',
      data: {}//{name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  listar() {
    this.colunaService.listar().subscribe(cols => {
      this.colunas = cols;
      console.log(this.colunas)
      console.log("AAA")
    })
  }

  adicionarTarefa(col: Coluna){ //, tar: Tarefa
    let t = new Tarefa()
    t.nome = "Add"
    t.tags.push(new Tag());

    col.tarefas.push(t);
    this.colunaService.salvarColuna(col).subscribe(() => {
      this.listar();
    });
  }

  deletarTarefa(col: Coluna, tar: Tarefa) {
    col.tarefas.splice(col.tarefas.indexOf(tar), 1);
    this.colunaService.salvarColuna(col).subscribe(() => {
      this.listar();
    });
  }

  atualizarTarefa(col: Coluna, tar: Tarefa) {
    let i = col.tarefas.indexOf(tar)
    col.tarefas[i] = tar;
    this.colunaService.salvarColuna(col).subscribe(() => {
      this.listar();
    });
  }
}
