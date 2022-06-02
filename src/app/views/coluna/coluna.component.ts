import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule}  from '@angular/cdk/drag-drop';
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
  tarefa? : Tarefa;
  indexColuna? : number;
  indexColunaEdit?: number;

  tags : Tag[] = [];

  constructor(private TagService: TagService, private colunaService: ColunaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listar();
    this.listarTags();
  }

  novaColuna(nome: string) {
    const c = new Coluna();
    c.nome = nome;

    this.colunaService.inserir(c).subscribe(res => {
      this.listar();
    });
  }

  selecionarColunaEdicao(id: number) {
    this.indexColunaEdit = id;
  }

  concluir(i : number) {
    this.indexColunaEdit = undefined;
    this.colunaService.salvarColuna(this.colunas![i]).subscribe(res => {
      this.listar();
    })
  }

  deletarColuna(id?: number) {
    if(id == undefined) { return }

    this.colunaService.deletar(id).subscribe(() => {
      this.listar();
    })
  }

  openDialog(t: Tarefa, col: Coluna): void {
    const dialogRef = this.dialog.open(TarefaFormDialogComponent, {
      width: '30%',
      data: t//{name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let i = col.tarefas.findIndex(ta => ta == t);
        col.tarefas[i] = result;

        this.colunaService.salvarColuna(col).subscribe(res => {
          this.listar();
          this.listarTags();
        });
      }
    });
  }

  novo(indexColuna : number) {
    this.tarefa = new Tarefa();
    this.indexColuna = indexColuna;
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
      t.nome = tag.nome;
      t.cor = tag.cor;

      this.tarefa.tags.push(t);
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

  drop2(event: CdkDragDrop<Coluna[]>) {
    if (this.colunas) {
      moveItemInArray(this.colunas, event.previousIndex, event.currentIndex);
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
