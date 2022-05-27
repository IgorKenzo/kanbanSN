import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coluna } from 'src/model/coluna';


@Injectable({
  providedIn: 'root'
})
export class ColunaService {

  constructor(private httpClient: HttpClient) { }

  listar() : Observable<Coluna[]> {
    return this.httpClient.get<Coluna[]>(`${environment.apiEndpoint}/colunas`)
  }

  salvarColuna(coluna: Coluna) : Observable<Coluna> {
    return this.httpClient.put<Coluna>(`${environment.apiEndpoint}/colunas/${coluna.id}`, coluna)
  }
}
