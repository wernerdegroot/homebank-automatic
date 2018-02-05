import { BankTransaction, getYear, getWordsInDescription } from './bank.transaction'

export type Property<A> = Readonly<{
  extractor: (t: BankTransaction) => A[]
}>

export const propertyYear = {
  extractor: getYear
}

export const propertyWordsInDescription = {
  extractor: getWordsInDescription
}

export const properties: Property<number | string>[] = [
  propertyYear,
  propertyWordsInDescription
]