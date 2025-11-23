import { Tarefa } from "@/types/tarefas";
import api from "./api";

export async function listarTarefasPorUsuario(idusuario: number): Promise<Tarefa[]> {
  const response = await api.get<Tarefa[]>("/tarefas");
  return response.data.filter((t) => t.idusuario === idusuario);
}

export async function criarTarefa(tarefa: {
  idusuario: number;
  titulo_tarefa: string;
  descricao_tarefa: string;
  status_tarefa: string;
}): Promise<void> {
  await api.post("/tarefas", tarefa);
}

export async function excluirTarefa(idtarefa: number): Promise<void> {
  await api.delete(`/tarefas/${idtarefa}`);
}

export async function atualizarTarefa(idtarefa: number, tarefa: {
  idusuario: number;
  titulo_tarefa: string;
  descricao_tarefa: string;
  status_tarefa: string;
}): Promise<void> {
  await api.put(`/tarefas/${idtarefa}`, tarefa);
}
