import { Tarefa } from "./tarefa";

export class Coluna {
    id? = undefined;
    nome = "";
    tarefas = new Array<Tarefa>();
    ordem = 0;
}