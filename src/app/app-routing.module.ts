import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColunaComponent } from './views/coluna/coluna.component';
import { SobreComponent } from './views/sobre/sobre.component';
import { TagComponent } from './views/tag/tag.component';

const routes: Routes = [
  { path: 'colunas', component: ColunaComponent },
  { path: 'tags', component: TagComponent },
  { path: 'sobre', component: SobreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
