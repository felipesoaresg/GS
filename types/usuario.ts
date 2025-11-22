export interface Usuario {
  idusuario: number;
  nome_usuario: string;
  email_usuario: string;
  senha_usuario: string;
  cargo_usuario?: string;      
  acessibilidade?: string;
  tipo_usuario: "user" | "gestor";
}