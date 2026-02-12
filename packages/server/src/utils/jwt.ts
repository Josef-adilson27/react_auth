import jwt from 'jsonwebtoken';

export interface JwtPayload {
  [key: string]: any;
  exp?: number;
  iat?: number;
}

export class JwtUtils {
  static sign(payload: JwtPayload, secret: string): string {
    if (!secret) {
      throw new Error("JWT_SECRET not provided");
    }
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  }

  static verify(token: string, secret: string): JwtPayload {
    if (!secret) {
      throw new Error("JWT_SECRET not provided");
    }
    
    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
 
  static decode(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }

  static isExpired(token: string, secret: string): boolean {
    if (!secret) {
      throw new Error("JWT_SECRET not provided");
    }
    
    try {
      const payload = JwtUtils.verify(token, secret);
      if (!payload.exp) return false;

      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }
 
  static createRefreshToken(payload: JwtPayload, secret: string): string {
    if (!secret) {
      throw new Error("JWT_SECRET not provided");
    }
    return jwt.sign(payload, secret, { expiresIn: "7d" });
  }

  // Дополнительный метод для проверки валидности без выбрасывания исключения
  static isValid(token: string, secret: string): boolean {
    try {
      JwtUtils.verify(token, secret);
      return true;
    } catch {
      return false;
    }
  }

  // Метод для получения времени истечения токена
  static getExpirationTime(token: string, secret: string): Date | null {
    try {
      const payload = JwtUtils.verify(token, secret);
      if (payload.exp) {
        return new Date(payload.exp * 1000); // конвертируем секунды в миллисекунды
      }
      return null;
    } catch {
      return null;
    }
  }
}


export class JwtUtilsFactory {
  static create(secret: string) {
    return {
      sign: (payload: JwtPayload) => JwtUtils.sign(payload, secret),
      verify: (token: string) => JwtUtils.verify(token, secret),
      isExpired: (token: string) => JwtUtils.isExpired(token, secret),
      createRefreshToken: (payload: JwtPayload) => JwtUtils.createRefreshToken(payload, secret),
      isValid: (token: string) => JwtUtils.isValid(token, secret),
      getExpirationTime: (token: string) => JwtUtils.getExpirationTime(token, secret),
      decode: JwtUtils.decode,
    };
  }
}