import { Meta } from "@/types/metas";
import api from "./api";

export async function listarMetasPorUsuario(idusuario: number): Promise<Meta[]> {
  const response = await api.get<Meta[]>("/metas");
  return response.data.filter((m) => m.idusuario === idusuario);
}

export async function criarMeta(meta: {
  idusuario: number;
  titulo_meta: string;
  descricao_meta?: string | null;
}): Promise<void> {
  await api.post("/metas", meta);
}

export async function excluirMeta(idmeta: number): Promise<void> {
  await api.delete(`/metas/${idmeta}`);
}
