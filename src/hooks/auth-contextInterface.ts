import type { IUser } from "@/interfaces/User"

export interface AuthContextType {
  user: IUser | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<IUser | null>
  register: (email: string, password: string, name: string) => Promise<IUser | null>
  logout: () => void
  loading: boolean
}