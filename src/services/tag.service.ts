import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag } from 'src/model/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  listar() : Observable<Tag[]> {
    return this.http.get<Tag[]>(environment.apiEndpoint + "/tag");
  }

  criar(tag : Tag) : Observable<Tag> {
    return this.http.post<Tag>(environment.apiEndpoint + "/tag", tag);
  }

  atualizar(tag : Tag) : Observable<Tag> {
    return this.http.put<Tag>(environment.apiEndpoint + "/tag/" + tag.id, tag);
  }

  deletar(tag : Tag) {
    return this.http.delete<Tag>(environment.apiEndpoint + "/tag/" + tag.id);
  }
}
