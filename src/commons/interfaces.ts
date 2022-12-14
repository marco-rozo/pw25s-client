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
  id?: string;
  accountId?: number;
  categoryId?: number;
  value: number;
  amountPaid?: number;
  description?: string;
  type: number;
}

export interface IMovimentation {
  id?: number;
  value: string;
  amountPaid: string;
  description: string;
  type: number;
  dtPayment: string;
  dtDue: string;
  category: ICategory;
  account: IAccount;
}

export interface IDashBoard {
  valueTotalReceipts: number;
  valueTotalReceived: number;
  valueRemainingReceipts: number;
  numReceipts: number;
  valueTotalExpenses: number;
  valueTotalExpensesPaid: number;
  valueRemainingExpenses: number;
  numExpenses: number;
  balance: number;
}
