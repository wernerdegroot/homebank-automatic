import { Category } from '../../homebank/category'
import { Action } from '../actions'
import { SET_CATEGORIES } from './actions'

export function categories(categories: Category[] = [], action: Action): Category[] {
  if (action.type === SET_CATEGORIES) {
    return action.categories
  } else {
    return categories
  }
}