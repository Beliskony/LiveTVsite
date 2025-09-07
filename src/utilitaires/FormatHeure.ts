export const extractHourFromDateTime = (dateTime: string): string => {
  if (!dateTime) return ""

  // Exemple dateTime : "2025-09-07 15:30:00"
  const parts = dateTime.split(" ")
  if (parts.length !== 2) return ""

  const timePart = parts[1] // "15:30:00"
  const timeParts = timePart.split(":")
  if (timeParts.length < 2) return ""

  // Retourne uniquement "HH:mm"
  return `${timeParts[0]}:${timeParts[1]}`
}
