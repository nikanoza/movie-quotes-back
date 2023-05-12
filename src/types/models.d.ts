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

export interface User {
  name: string;
  emails: Email[];
  password: string;
  movies: Movie[];
  id: string;
}
