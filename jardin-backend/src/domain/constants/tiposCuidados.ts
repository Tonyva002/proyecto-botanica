
// Lista fija de tipos permitidos de cuidado.
export const TIPOS_CUIDADO = [
  "Riego",
  "Poda",
  "Fertilizacion",
  "Luz",
] as const;

// Genera automáticamente el tipo: "Riego" | "Poda" | "Fertilizacion" | "Luz"
export type TipoCuidado = (typeof TIPOS_CUIDADO)[number];

// Valida si el valor recibido pertenece a los tipos permitidos.
export function esTipoCuidado(valor: string): valor is TipoCuidado {
  return TIPOS_CUIDADO.includes(valor as TipoCuidado);
}