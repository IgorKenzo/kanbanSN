import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Coluna } from 'src/model/coluna';
import { Tag } from 'src/model/tag';
import { Tarefa } from 'src/model/tarefa';
import { ColunaService } from 'src/services/coluna.service';
import { TagService } from 'src/services/tag.service';
import { TarefaFormDialogComponent } from '../tarefa-form-dialog/tarefa-form-dialog.component';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.css']
})
export class ColunaComponent implements OnInit {

  colunas? : Coluna[];
  tarefa? : Tarefa
  indexColuna? : number

  tags : Tag[] = [];

  constructor(private TagService: TagService, private colunaService: ColunaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listar();
    this.listarTags();
  }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(TarefaFormDialogComponent, {
  //     width: '30%',
  //     data: {}//{name: this.name, animal: this.animal},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // }

  novo(indexColuna : number) {
    this.tarefa = new Tarefa();
    this.indexColuna = indexColuna;
    console.log(indexColuna)
  }
  cancelar() {
    this.tarefa = undefined;
    this.indexColuna = undefined;
  }

  listar() {
    this.colunaService.listar().subscribe(cols => {
      this.colunas = cols;
    })
  }

  listarTags() {
    this.TagService.listar().subscribe((tags) => {
      this.tags = tags;
    })
  }

  adicionarTarefa(){ //, tar: Tarefa
    if (this.colunas && this.indexColuna != undefined && this.tarefa) {
      this.colunas[this.indexColuna].tarefas.push(this.tarefa);
      console.log(this.colunas);
      this.colunaService.salvarColuna(this.colunas[this.indexColuna]).subscribe(() => {
        this.listar();
      });
    }
    this.tarefa = undefined;
    this.indexColuna = undefined;
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

  adicionarTagGeral(tag : Tag) {
    if (this.tarefa) {
      let t = new Tag()
    }
  }

  adicionarTagTarefaNova(tag : Tag) {
    if (this.tarefa) {
      let t = new Tag()
    }
  }

  drop(event: CdkDragDrop<Tarefa[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if (this.colunas) {
      this.colunas.forEach(c => {
        this.colunaService.salvarColuna(c).subscribe(() => {
          this.listar();
        });
      });
    }
  }

  ChecaSeClaro(cor : String) : Boolean {
    let r = Number("0x" + cor.substring(1,3));
    let g = Number("0x" + cor.substring(3,5));
    let b = Number("0x" + cor.substring(5,7));

    let cinza = (r + g + b) / 3;

    return cinza > 125;
  }
}
