import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/model/tag';
import { TagService } from 'src/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tags: Tag[] = [];
  tag? : Tag;

  constructor(private TagService : TagService) { }

  ngOnInit(): void {
    this.listar()
  }

  listar() {
    this.TagService.listar().subscribe((tags) => {
      this.tags = tags;
    })
  }

  novo() {
    this.tag = new Tag();
  }

  cancelar() {
    this.tag = undefined;
  }

  alterar(tag : Tag) {
    this.tag = tag
  }

  salvar() {
    if (this.tag) {
      if (!this.tag.id) {
        this.TagService.criar(this.tag).subscribe((tag) => {
          this.listar();
        })
      }
      else {
        this.TagService.atualizar(this.tag).subscribe((tag) => {
          this.listar();
        })
      }
    }
    this.tag = undefined;
  }

  deletar(tag : Tag) {
    this.TagService.deletar(tag).subscribe(() => {
      this.listar()
    })
  }

}
