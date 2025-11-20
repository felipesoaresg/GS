import { Usuario } from "@/types/usuario";
import api from "./api";

export async function autenticar(email: string, senha: string): Promise<Usuario | null> {
  const response = await api.get<Usuario[]>("/usuarios");
  console.log("Resposta da API:", response.data);

  const usuarios = response.data;

  const usuario = usuarios.find(
    (u) => u.EMAIL_USUARIO === email && u.SENHA_USUARIO === senha
  );

  return usuario || null;
}
