export interface LoginResponse {
  user: UserLogin;
  token: string;
}

export interface UserLogin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}
