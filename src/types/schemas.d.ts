export interface RegisterSchema {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  backlink: string;
}

export interface LoginSchema {
  email: string;
  password: string;
}
