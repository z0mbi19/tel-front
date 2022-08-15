export interface Login {
  email: string;
  password: string;
}

export interface AuthContextType {
  handleLogin: (auth: Login) => Promise<void>;
  handleLogout: () => Promise<void>;
  user: { id: number; email: string; adm: boolean; jwt: string } | null;
}
