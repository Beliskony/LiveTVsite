import type { IUser } from "@/interfaces/User"

export interface AuthContextType {
  user: IUser | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}