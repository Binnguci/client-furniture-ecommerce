export interface User  {
    id: number | null,
    username: string | null,
    fullName: string | null,
    email: string | null,
    phone: string | null,
    isLocked: number,
    isActive: number,
    role:{
        id: number,
        name: string
    }
    otpExpired?: string,
    createdAt?: string,
    updatedAt?: string
}