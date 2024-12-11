export interface User  {
    id: number | null,
    username: string | null,
    fullName: string | null,
    email: string | null,
    phone: string | null,
    otpExpired?: string,
    createdAt?: string,
    updatedAt?: string
}