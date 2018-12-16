export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface RegisterParams {
  email: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
  id: number;
}