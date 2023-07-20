export interface Email {
  email: string;
  verify: boolean;
  primary: boolean;
}

export interface Name {
  eng: string;
  geo: string;
}

export interface Movie {
  name: Name;
  categories: string[];
  year: number;
  director: Name;
  description: Name;
  poster: string;
  id: number;
}

export interface UserT {
  name: string;
  emails: Email[];
  password: string;
  movies: Movie[];
  id: string;
  avatar?: string;
}

export interface EmailValidationType {
  email: string;
  hash: string;
}

export interface PasswordResetType extends EmailValidationType {
  expireIn: Date;
}