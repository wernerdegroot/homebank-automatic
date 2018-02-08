import { combineReducers } from "redux";
import { bankTransactions } from './bank.transactions/reducer'
import { categories } from './categories/reducer'

export const reducer = combineReducers({
  categories,
  bankTransactions,
})