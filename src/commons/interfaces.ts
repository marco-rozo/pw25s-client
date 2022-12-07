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

export interface IMovimentationInsert {
  accountId?: number;
  categoryId?: number;
  value: number;
  amountPaid?: number;
  description?: string;
  type: string;
}

export interface IMovimentation {
  id?: number;
  value: string;
  amountPaid: string;
  description: string;
  type: string;
  dtPayment: string;
  dtDue: string;
  category: ICategory;
  account: IAccount;
}
