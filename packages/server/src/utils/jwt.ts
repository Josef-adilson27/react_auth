import jwt from "jsonwebtoken";

export interface JwtPayload {
  [key: string]: any;
  exp?: number;
  iat?: number;
}

export class JwtUtils {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h'});
  }

  verify(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret) as JwtPayload;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  decode(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }

  isExpired(token: string): boolean {
    try {
      const payload = this.verify(token);
      if (!payload.exp) return false;

      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  createRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: '7d'});
  }

}

// Пример использования
export const createJwtUtils = (secret: string): JwtUtils => {
  return new JwtUtils(secret);
};
