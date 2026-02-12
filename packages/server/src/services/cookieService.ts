export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface CookieOptions {
  httpOnly: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
  domain?: string;
}

export interface Cookie {
  name: string;
  value: string;
  options: CookieOptions;
}

export class CookieService {
  getAuthCookies(tokens: AuthTokens): Cookie[] {
    return [
      {
        name: 'access_token',
        value: tokens.accessToken,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/api',
          maxAge: 15 * 60 * 1000 // 15 минут
        }
      },
      {
        name: 'refresh_token',
        value: tokens.refreshToken,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/api/auth/refresh', // Важно для ограничения
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 дней
        }
      }
    ];
  }
}