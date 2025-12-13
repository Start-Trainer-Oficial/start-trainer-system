export function formatDateBR(date: string | Date): string {
  if (!date) return "";

  let d: Date;

  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-").map(Number);
    d = new Date(year, month - 1, day);
  } else {
    d = new Date(date);
  }

  if (isNaN(d.getTime())) return date.toString();
  return d.toLocaleDateString("pt-BR");
}
