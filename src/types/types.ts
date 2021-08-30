export enum Status {
  loading = "loading",
  ready = "ready",
  update = "update",
}

export interface Person {
  name: string
  comment: string
}

export const steps: string[] = [
  "Entrevista inicial",
  "Entrevista técnica",
  "Oferta",
  "Asignación",
  "Rechazo",
]
