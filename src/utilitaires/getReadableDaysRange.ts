export default function getReadableDaysRange(selectedDays: string[]): string {
  const orderedDays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

  const dayLabels: Record<string, string> = {
    lundi: "lundi",
    mardi: "mardi",
    mercredi: "mercredi",
    jeudi: "jeudi",
    vendredi: "vendredi",
    samedi: "samedi",
    dimanche: "dimanche",
  }

  if (selectedDays.length === 7) return "tous les jours"

  // Tri dans l'ordre de la semaine
  const sortedDays = orderedDays.filter(day => selectedDays.includes(day))

  // Indices des jours sélectionnés
  const indices = sortedDays.map(day => orderedDays.indexOf(day))

  // Vérifie si tous les jours sont consécutifs
  const isStrictlyConsecutive = indices.every((val, i, arr) => i === 0 || val === arr[i - 1] + 1)

  if (isStrictlyConsecutive && indices.length >= 2) {
    const first = dayLabels[sortedDays[0]]
    const last = dayLabels[sortedDays[sortedDays.length - 1]]
    return `du ${first} au ${last}`
  }

  // Vérifie si les jours sont espacés de manière régulière (intervalle constant)
  if (indices.length > 2) {
    const intervals = indices.slice(1).map((val, i) => val - indices[i])
    const allSameInterval = intervals.every((int) => int === intervals[0])

    if (allSameInterval) {
      return sortedDays.map((day) => dayLabels[day]).join(", ")
    }
  }

  // Liste simple si rien de particulier
  return sortedDays.map((day) => dayLabels[day]).join(", ")
}

