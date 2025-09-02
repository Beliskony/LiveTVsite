import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";

export const formatRelativeDate = (dateISO: string): string => {
  const date = new Date(dateISO);
  if (isNaN(date.getTime())) {
    return "Date invalide"; // Gérer les dates invalides
  }
  return formatDistanceToNow(date, { addSuffix: true, locale: fr });
};

export function videoFormatRelativeDate(input: string | Date): string {
  const date = new Date(input)
  return format(date, "dd/MM/yyyy", { locale: fr })
}
