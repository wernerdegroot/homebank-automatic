export type BankTransaction = Readonly<{
    fromAccountNumber: string,
    fromName: string,
    date: Date,
    wordsInDescription: string[]
}>

export function getYear(t: BankTransaction): number[] {
    return [t.date.getFullYear()]
}

export function getWordsInDescription(t: BankTransaction): string[] {
    return t.wordsInDescription
}