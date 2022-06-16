import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanbanSN';
  editing = false

  ngOnInit(): void {
    const t = localStorage.getItem("nomeQuadro");
    if (t) {
      this.title = t;
    }
  }

  salvarNome() {
    localStorage.setItem("nomeQuadro", this.title);
    this.editing = false
  }
}
