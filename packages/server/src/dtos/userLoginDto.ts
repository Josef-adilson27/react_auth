import { z, ZodError } from "zod";

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
    try {
      // Используем parse вместо safeParse для получения исключения
      const validatedData = CreateUserSchema.parse(data);
      
      return new UserLoginDTOClass(
        validatedData.email.toLowerCase().trim(),
        validatedData.password,
      );
    } catch (error) {
      if (error instanceof ZodError) {
        // получение ошибок из ZodError
        const formattedErrors = error.issues
          .map(issue => {
            const path = issue.path.join('.');
            return path ? `${path}: ${issue.message}` : issue.message;
          })
          .join('\n');
        throw new Error(formattedErrors);
      }
      
      // Если это не ZodError, пробрасываем дальше
      throw error;
    }
  }
}
