import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
      "Name can only contain letters, spaces and hyphens",
    ),

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

export class CreateUserDTOClass {
  constructor(
    readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
  static validate(data: unknown): CreateUserDTOClass {
    const result = CreateUserSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return new CreateUserDTOClass(
      result.data.name.trim(),
      result.data.email.toLowerCase().trim(),
      result.data.password,
    );
  }
}