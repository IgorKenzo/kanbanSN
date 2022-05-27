import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarefa } from 'src/model/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private httpClient: HttpClient) { }

}
