export interface IUserSignUp {
  firstName: string;
  lastName: string;
  phone: string;
  individualRegistration: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ICategory {
  id?: number;
  name: string;
}

export interface IAccount {
  id?: number;
  agence: string;
  number: string;
  name: string;
  description: string;
  type: string;
}
