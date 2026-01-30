import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().optional(),
  password: z.string(),
});

export const RegisterSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().optional(),
  }),
  token: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
