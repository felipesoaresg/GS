export interface Tarefa {
  idtarefa: number;
  idusuario: number;
  titulo_tarefa: string; 
  descricao_tarefa: string;
  status_tarefa: "pendente" | "concluida";
  datahora_tarefa: string;
}