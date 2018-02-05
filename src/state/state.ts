import { BankTransaction } from "../bank.transaction";

export type State = Readonly<{
  bankTransactions: BankTransaction[]
}>