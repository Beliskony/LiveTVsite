import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const formatRelativeDate = (dateISO: string): string => {
  const date = new Date(dateISO);
  if (isNaN(date.getTime())) {
    return "Date invalide"; // Gérer les dates invalides
  }
  return formatDistanceToNow(date, { addSuffix: true, locale: fr });
};