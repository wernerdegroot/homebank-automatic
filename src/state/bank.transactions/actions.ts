import { BankTransaction } from "../../bank.transaction";

export const SET_BANK_TRANSACTIONS = 'SET_BANK_TRANSACTIONS'

export type SetBankTransactionsAction = Readonly<{
  type: typeof SET_BANK_TRANSACTIONS,
  bankTransactions: BankTransaction[]
}>

export type BankTransactionsAction = SetBankTransactionsAction