export interface Candidate {
  id: string
  name: string
  step: "Entrevista inicial" | "Entrevista técnica" | "Oferta" | "Asignación" | "Rechazo"
  comments: string
}

export enum Step {
  initial = "Entrevista inicial",
  interview = "Entrevista tecnica",
  ofert = "Oferta",
  assign = "Asignacion",
  reject = "Rechazo",
}
