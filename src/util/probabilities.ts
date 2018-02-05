import { BankTransaction } from '../bank.transaction'
import { Property } from '../bank.transaction.property'
import { Transaction } from '../transaction'
import { Bin } from '../transaction.bin'
import { includes, uniq } from 'lodash'

function withBinId(binId: Bin['id'], transactions: Transaction[]): Transaction[] {
  return transactions.filter(t => t.binId === binId)
}

function probabilityBin(binId: Bin['id'], transactions: Transaction[]): number {
  return withBinId(binId, transactions).length / transactions.length
}

export function numberOfOccurences<A>(needle: A, haystack: A[]): number {
  return haystack.filter(h => h === needle).length
}

function probabilityPropertyValue<A>(propertyValue: A, property: Property<A>, transactions: Transaction[]): number {

  if (transactions.length === 0) {
    throw `Cannot determine the probability of property value ${propertyValue} based on an empty set of transactions`
  }

  const numberOfTransactionsWithPropertyValue = transactions
    .map(t => t.bankTransaction)
    .map(property.extractor)
    .filter(pvs => includes(pvs, propertyValue))
    .length

  return numberOfTransactionsWithPropertyValue / transactions.length
}

function probabilityPropertyValues<A>(propertyValues: A[], property: Property<A>, transactions: Transaction[]): number {

  if (transactions.length === 0) {
    throw `Cannot determine the probability of property values [${propertyValues.join(', ')}] based on an empty set of transactions`
  }

  return propertyValues
    .map(v => probabilityPropertyValue(v, property, transactions))
    .reduce((l, r) => l * r, 1)
}

function probabilityPropertyValueGivenBin<A>(binId: Bin['id'], propertyValues: A[], property: Property<A>, transactions: Transaction[]): number {
  return probabilityPropertyValues(propertyValues, property, withBinId(binId, transactions))
}

export function probabilityBinGivenPropertyValue<A>(binId: Bin['id'], bankTransaction: BankTransaction, property: Property<A>, transactions: Transaction[]): number {

  const pb = probabilityBin(binId, transactions)

  const allPropertyValuesInTransactions = transactions
    .map(t => t.bankTransaction)
    .map(property.extractor)
    .reduce((l, r) => [...l, ...r], [])

  // No property values in transactions:
  if (allPropertyValuesInTransactions.length === 0) {
    return pb 
  }

  // No transaction in the bin yet:
  if (withBinId(binId, transactions).length === 0) {
    return 0
  }
 
  // Only take into account property values that actually exist in the sample,
  // to prevent probabilities of zero.
  const propertyValues = uniq(property.extractor(bankTransaction))
    .filter(propertyValue => includes(allPropertyValuesInTransactions, propertyValue))

  const pvsb = probabilityPropertyValueGivenBin(binId, propertyValues, property, transactions)
  const pvs = probabilityPropertyValues(propertyValues, property, transactions)
  return pvsb * pb / pvs
}
