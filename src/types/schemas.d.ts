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


export interface PasswordRecoverySchema {
  email: string;
  backLink: string;
}

export interface PasswordResetSchema {
  password: string;
  confirmPassword: string;
  hash: string;
}