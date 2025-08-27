import { UserSession } from '@/types/vpn';

class AuthService {
  private static instance: AuthService;
  private session: UserSession | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<UserSession> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const session: UserSession = {
            id: 'user_123',
            email,
            token: 'jwt_token_123',
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          };
          this.session = session;
          resolve(session);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  async register(email: string, password: string): Promise<UserSession> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const session: UserSession = {
            id: 'user_new',
            email,
            token: 'jwt_token_new',
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          };
          this.session = session;
          resolve(session);
        } else {
          reject(new Error('Registration failed'));
        }
      }, 1000);
    });
  }

  logout(): void {
    this.session = null;
  }

  getSession(): UserSession | null {
    return this.session;
  }

  isAuthenticated(): boolean {
    return this.session !== null;
  }
}

export default AuthService.getInstance();