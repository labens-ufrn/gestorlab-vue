export interface Genero {
  id: string;
  title: string;
}

export interface Permission {
  id: string;
  title: string;
}

export interface Imagefile {
  name: string;
  type: string;
  size: number;
}

export interface CreateLaboratory {
  nome: string;
  sobre: string;
  template: number;
  descricao: string;
  email: string;
  image: string;
}