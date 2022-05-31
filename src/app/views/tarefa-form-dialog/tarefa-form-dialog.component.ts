import { JsonpClientBackend } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag } from 'src/model/tag';
import { Tarefa } from 'src/model/tarefa';
import { TagService } from 'src/services/tag.service';

@Component({
  selector: 'app-tarefa-form-dialog',
  templateUrl: './tarefa-form-dialog.component.html',
  styleUrls: ['./tarefa-form-dialog.component.css']
})
export class TarefaFormDialogComponent implements OnInit {

  tags = Array<Tag>();

  tempTarefa = new Tarefa();

  constructor(
    public dialogRef: MatDialogRef<TarefaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tarefa,
    private tagService : TagService
  ) {
    this.tempTarefa = JSON.parse(JSON.stringify(data));
  }

  ngOnInit(): void {
    this.tagService.listar().subscribe(tags => {
      this.tags = tags;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adicionarTagTarefaNova(tag : Tag) {
      
      if(!this.tempTarefa.tags.flatMap(t => t.nome).includes(tag.nome)) {
        let t = new Tag();
        t.nome = tag.nome;
        t.cor = tag.cor;
        this.tempTarefa.tags.push(t);
      }
      
  }
  
  deletar(t: Tag) {
    this.tempTarefa.tags.splice(this.tempTarefa.tags.indexOf(t), 1);
  }


  checaSeClaro(cor : String) : Boolean {
    let r = Number("0x" + cor.substring(1,3));
    let g = Number("0x" + cor.substring(3,5));
    let b = Number("0x" + cor.substring(5,7));

    let cinza = (r + g + b) / 3;

    return cinza > 125;
  }

}


