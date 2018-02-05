import { getWordsInDescription, BankTransaction } from "../bank.transaction";
import { Validated } from "../util/validated";
import { Observable } from "rxjs/Observable";
import * as Papa from 'papaparse'
import * as _ from 'lodash'

export type CsvColumn
  = typeof bankAccountColumn
  | typeof dateColumn
  | typeof amountColumn
  | typeof nameColumn
  | typeof descriptionColumn1
  | typeof descriptionColumn2
  | typeof descriptionColumn3
  | typeof betalingskenmerkColumn

export type CsvRecord = {
  [K in CsvColumn]?: string
}

export const bankAccountColumn = 'Tegenrekening IBAN/BBAN'
export const dateColumn = 'Datum'
export const amountColumn = 'Bedrag'
export const nameColumn = 'Naam tegenpartij'
export const descriptionColumn1 = 'Omschrijving-1'
export const descriptionColumn2 = 'Omschrijving-2'
export const descriptionColumn3 = 'Omschrijving-3'
export const betalingskenmerkColumn = 'Betalingskenmerk'

function toWords(toSplit: string): string[] {

  type S = (s: string[]) => string[]

  const split = (sep: string): S => subject => _.flatMap(subject, e => e.split(sep))
  
  function compose(left: S, right: S): S {
    return s => left(right(s))
  }
 
  function composeAll(ss: S[]): S {
    return ss.reduce(compose, (s: string[]) => s)
  }

  const splitChars = [
    ' ',
    ',',
    '.',
    '/',
    '\\',
    ':'
  ]

  const fs: S[] = splitChars.map(split)

  return composeAll(fs)([toSplit])
    .filter(s => s !== '')
    .filter(s => isNaN(parseInt(s)))
}

function parseDateFromCsvRecord(csvRecord: CsvRecord): Validated<string, Date> {
  const dateAsString = csvRecord[dateColumn]
  if (dateAsString === undefined) {
    return Validated.error(`Column ${dateColumn} not found`)
  }

  const dateComponents = dateAsString.split('-').map(s => parseInt(s))
  if (dateComponents.length !== 3 || dateComponents.some(i => isNaN(i))) {
    return Validated.error(`Value ${dateAsString} is not a valid date!`)
  } else {
    const date = new Date(Date.UTC(dateComponents[0], dateComponents[1] - 1, dateComponents[2]))
    return Validated.ok(date)
  }
}

function getWordsFromCsvRecord(csvRecord: CsvRecord): Validated<string, string[]> {
  const values = [csvRecord[descriptionColumn1], csvRecord[descriptionColumn2], csvRecord[descriptionColumn3], csvRecord[betalingskenmerkColumn]]
  if (values.some(value => value === undefined)) {
    return Validated.error(`One column of ${descriptionColumn1}, ${descriptionColumn2}, ${descriptionColumn3} or ${betalingskenmerkColumn} not found`)
  } else {
    const asSingleString = values.join(' ')
    return Validated.ok(toWords(asSingleString))
  }
}

function toBankTransaction(csvRecord: CsvRecord): Validated<string, BankTransaction> {
  return Validated.combine({
    fromAccountNumber: Validated.notUndefined(csvRecord[bankAccountColumn], `Column ${bankAccountColumn} not found`),
    fromName: Validated.notUndefined(csvRecord[nameColumn], `Column ${nameColumn} not found`),
    date: parseDateFromCsvRecord(csvRecord),
    wordsInDescription: getWordsFromCsvRecord(csvRecord)
  })
}

function toBankTransactions(csvRecords: CsvRecord[]): Validated<string, BankTransaction[]> {
  return Validated.seq(csvRecords.map(toBankTransaction))
}

function asCsvRecords(s: string): Validated<string, CsvRecord[]> {
  const parseResult = Papa.parse(s, {
    header: true,
    skipEmptyLines: true
  })

  if (parseResult.errors.length > 0) {
    return Validated.error('Not a valid CSV file')
  } else {
    return Validated.ok<string, CsvRecord[]>(parseResult.data)
  }
}

export function csvStringAsBankTransactions(s: string): Validated<string, BankTransaction[]> {
  return asCsvRecords(s).andThen(toBankTransactions)
}