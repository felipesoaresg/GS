import { Usuario } from "@/types/usuario";
import api from "./api";

export async function autenticar(email: string, senha: string): Promise<Usuario | null> {
  const response = await api.get<Usuario[]>("/usuarios");

  const usuarios = response.data;

  const usuario = usuarios.find(
    (u) => u.email_usuario === email && u.senha_usuario === senha
  );

  return usuario || null;
}
