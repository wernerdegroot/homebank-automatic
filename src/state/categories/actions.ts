import { Category } from '../../homebank/category'


export const SET_CATEGORIES = 'SET_CATEGORIES'

export type SetCategoriesAction = Readonly<{
  type: typeof SET_CATEGORIES,
  categories: Category[]
}>

export function setCategoriesAction(categories: Category[]): SetCategoriesAction {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

export type CategoriesAction = SetCategoriesAction