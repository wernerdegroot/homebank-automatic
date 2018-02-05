import { BankTransaction } from './bank.transaction'
import { Bin } from './transaction.bin';

export type Transaction = Readonly<{
  binId: Bin['id'],
  bankTransaction: BankTransaction
}>
