export type Bin = Readonly<{
  id: number,
  fromAccount: number,
  toAccount: number | null,
  description: string,
  category: number,
  payee: number
}>

export function binNumberPowerOfTwo(n: number): number {
  return Math.floor(Math.log(n) / Math.log(2))
}