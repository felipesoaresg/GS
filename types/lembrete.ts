export interface Lembrete {
  idlembrete: number;       
  idusuario: number;     
  tipo_lembrete: string;    
  frequencia: number;       
  ativo: "S" | "N";        
}

