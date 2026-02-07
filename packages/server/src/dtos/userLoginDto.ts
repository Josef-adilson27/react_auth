import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address",
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter and one number",
    ),
});

export class UserLoginDTOClass {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
  static validate(data: unknown): UserLoginDTOClass {
    const result = CreateUserSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return new UserLoginDTOClass(
      result.data.email.toLowerCase().trim(),
      result.data.password,
    );
  }
}