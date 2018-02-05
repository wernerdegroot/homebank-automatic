import { combineReducers } from "redux";
import { bankTransactions } from './bank.transactions/reducer'

export const reducer = combineReducers({
  bankTransactions
})