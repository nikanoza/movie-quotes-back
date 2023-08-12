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
  id: string;
}

export interface UserT {
  name: string;
  emails: Email[];
  password: string;
  movies: Movie[];
  likes: string[];
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

export interface CommentType {
  userId: string;
  text: string;
}

export interface QuoteType {
  eng: string;
  geo: string;
  poster: string;
  comments: CommentType[];
  movieId: string;
  userId: string;
  likes: number;
  id: string;
}
