import { Menu } from "@/shared/types/menu"
import { User } from "@/shared/types/user"
import z from "zod"

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type LoginRequest = z.infer<typeof loginSchema>

export interface LoginResponse {
    accessToken: string
    refreshToken?: string
    user: {
        id: string
        email: string
        name?: string
    }
}

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

export type RegisterRequest = z.infer<typeof registerSchema>

export interface RegisterResponse {
    accessToken: string
    refreshToken?: string
    user: {
        id: string
        email: string
        name: string
    }
}

export interface GetProfileResponse {
    user: User;
    roles: string[];
    permissions: string[];
    menus: Menu[];
}
