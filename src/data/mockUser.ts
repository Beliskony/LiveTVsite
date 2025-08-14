import type { IUser } from "@/interfaces/User";

// Utilisateurs fictifs
export const mockUsers: IUser[] = [
  {
    id: "1",
    name: "Axel Admin",
    email: "axel@gmail.com",
    password:"qwerty123456",
    role: "admin",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password:"qwerty123456",
    role: "user",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    password:"qwerty123456",
    role: "user",
  },
]

// Token fictif (pour simuler une authentification)
export const mockToken = "fake-jwt-token"

// Petite fonction utilitaire pour simuler un délai réseau
export const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))