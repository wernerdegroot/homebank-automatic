import { BankTransaction } from "../../bank.transaction";
import { SET_BANK_TRANSACTIONS } from "./actions";
import { Action } from '../actions'

export function bankTransactions(bankTransactions: BankTransaction[] = [], action: Action): BankTransaction[] {
  if (action.type === SET_BANK_TRANSACTIONS) {
    return action.bankTransactions
  }

  return bankTransactions
}