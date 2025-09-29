export interface IUser {
    id: string
    email: string
    phoneNumber: string //nouveau
    name: string
    password:string
    role: "user" | "admin"   
}
