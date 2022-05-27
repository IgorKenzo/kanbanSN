import { Component, OnInit } from '@angular/core';
import { Coluna } from 'src/model/coluna';
import { ColunaService } from 'src/services/coluna.service';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.css']
})
export class ColunaComponent implements OnInit {

  colunas : Coluna[] | null = null ;

  constructor(private colunaService: ColunaService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.colunaService.listar().subscribe(cols => {
      this.colunas = cols;
    })
  }

}
