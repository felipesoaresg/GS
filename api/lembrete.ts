import { Lembrete } from "@/types/lembrete";
import api from "./api";

export async function listarLembretesPorUsuario(idusuario: number): Promise<Lembrete[]> {
  const response = await api.get<Lembrete[]>("/lembretes");
  return response.data.filter((l) => l.idusuario === idusuario);
}

export async function criarLembrete(lembrete: {
  idusuario: number;
  tipo_lembrete: string;
  frequencia: number;
  ativo: "S" | "N";
}): Promise<void> {
  await api.post("/lembretes", lembrete);
}

export async function atualizarLembrete(idlembrete: number, lembrete: {
  idusuario: number;
  tipo_lembrete: string;
  frequencia: number;
  ativo: "S" | "N";
}): Promise<void> {
  await api.put(`/lembretes/${idlembrete}`, lembrete);
}

export async function excluirLembrete(idlembrete: number): Promise<void> {
  await api.delete(`/lembretes/${idlembrete}`);
}
