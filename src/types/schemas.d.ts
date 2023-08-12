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

export interface CreateMovie extends Omit<Movie, "id"> {
  userId: string;
}

export interface CreateQuotes {
  userId: string;
  movieId: string;
  eng: string;
  geo: string;
  poster: string;
}

export interface EditQuotes {
  eng: string;
  geo: string;
  poster: string;
}

export interface NewComment {
  userId: string;
  quoteId: string;
  text: string;
}
