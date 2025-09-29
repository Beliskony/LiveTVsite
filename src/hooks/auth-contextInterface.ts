import type { IUser } from "@/interfaces/User"

export interface AuthContextType {
  user: IUser | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (identifiant: string, password: string) => Promise<IUser | null>
  register: (email: string, password: string, phoneNumber:string, name: string) => Promise<IUser | null>
  logout: () => void
  loading: boolean
  sendPasswordResetAndVerifyCode: (email: string) => Promise<boolean>   // ✅ ajouté
  resetPassword: (email: string, OTP: string, newPassword: string) => Promise<boolean>
}