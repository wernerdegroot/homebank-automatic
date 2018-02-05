import { Transaction } from '../transaction';
import { probabilityBinGivenPropertyValue } from './probabilities';
import { getYear } from '../bank.transaction';
import { properties, propertyYear, propertyWordsInDescription } from '../bank.transaction.property';

it('henk', () => {
  expect(true).toBe(false)
})

describe('probabilities', () => {
  it('should do it', () => {
    { // Test year
      const transactions: Transaction[] = [
        {
          binId: 1,
          bankTransaction: {
            fromAccountNumber: '',
            fromName: '',
            date: new Date(Date.UTC(2018, 1, 1)),
            wordsInDescription: []
          }
        },
        {
          binId: 2,
          bankTransaction: {
            fromAccountNumber: '',
            fromName: '',
            date: new Date(Date.UTC(2018, 1, 1)),
            wordsInDescription: []
          }
        }
      ]

      expect(probabilityBinGivenPropertyValue(
        1,
        {
          fromAccountNumber: '',
          fromName: '',
          date: new Date(Date.UTC(2018, 1, 1)),
          wordsInDescription: []
        },
        propertyYear,
        transactions
      )).toBe(0.5)

      expect(probabilityBinGivenPropertyValue(
        1,
        {
          fromAccountNumber: '',
          fromName: '',
          date: new Date(Date.UTC(2019, 1, 1)),
          wordsInDescription: []
        },
        propertyYear,
        transactions
      )).toBe(0.5)

      expect(probabilityBinGivenPropertyValue(
        3,
        {
          fromAccountNumber: '',
          fromName: '',
          date: new Date(Date.UTC(2018, 1, 1)),
          wordsInDescription: []
        },
        propertyYear,
        transactions
      )).toBe(0)
    }

    { // Test words in description (empty)
      const transactions: Transaction[] = [
        {
          binId: 1,
          bankTransaction: {
            fromAccountNumber: '',
            fromName: '',
            date: new Date(Date.UTC(2018, 1, 1)),
            wordsInDescription: []
          }
        },
        {
          binId: 2,
          bankTransaction: {
            fromAccountNumber: '',
            fromName: '',
            date: new Date(Date.UTC(2018, 1, 1)),
            wordsInDescription: []
          }
        }
      ]

      expect(probabilityBinGivenPropertyValue(
        1,
        {
          fromAccountNumber: '',
          fromName: '',
          date: new Date(Date.UTC(2018, 1, 1)),
          wordsInDescription: []
        },
        propertyWordsInDescription,
        transactions
      )).toBe(0.5)
    }

    { // Test words in description
      const transactions: Transaction[] = [
        {
          binId: 1,
          bankTransaction: {
            fromAccountNumber: '',
            fromName: '',
            date: new Date(Date.UTC(2018, 1, 1)),
            wordsInDescription: ['hamster', 'cat']
          }
        },
        {
          binId: 2,
          bankTransaction: {
            fromAccountNumber: '',
            fromName: '',
            date: new Date(Date.UTC(2018, 1, 1)),
            wordsInDescription: ['hamster', 'dog']
          }
        }
      ]

      expect(probabilityBinGivenPropertyValue(
        1,
        {
          fromAccountNumber: '',
          fromName: '',
          date: new Date(Date.UTC(2018, 1, 1)),
          wordsInDescription: []
        },
        propertyWordsInDescription,
        transactions
      )).toBe(0.5)

      expect(probabilityBinGivenPropertyValue(
        1,
        {
          fromAccountNumber: '',
          fromName: '',
          date: new Date(Date.UTC(2018, 1, 1)),
          wordsInDescription: ['hamster', 'koala']
        },
        propertyWordsInDescription,
        transactions
      )).toBe(0.5)

      expect(probabilityBinGivenPropertyValue(
        1,
        {
          fromAccountNumber: '',
          fromName: '',
          date: new Date(Date.UTC(2018, 1, 1)),
          wordsInDescription: ['hamster', 'hamster', 'hamster']
        },
        propertyWordsInDescription,
        transactions
      )).toBe(0.5)

      expect(probabilityBinGivenPropertyValue(
        1,
        {
          fromAccountNumber: '',
          fromName: '',
          date: new Date(Date.UTC(2018, 1, 1)),
          wordsInDescription: ['cat', 'koala']
        },
        propertyWordsInDescription,
        transactions
      )).toBe(1)

      expect(probabilityBinGivenPropertyValue(
        1,
        {
          fromAccountNumber: '',
          fromName: '',
          date: new Date(Date.UTC(2018, 1, 1)),
          wordsInDescription: ['dog', 'koala']
        },
        propertyWordsInDescription,
        transactions
      )).toBe(0)

      expect(probabilityBinGivenPropertyValue(
        1,
        {
          fromAccountNumber: '',
          fromName: '',
          date: new Date(Date.UTC(2018, 1, 1)),
          wordsInDescription: ['hamster', 'cat', 'koala']
        },
        propertyWordsInDescription,
        transactions
      )).toBe(1)
    }
  })
})
