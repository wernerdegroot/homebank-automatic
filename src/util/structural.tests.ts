import { isString, isBoolean, isObject } from "./structural";

describe('Validation of the structure of a JSON object', () => {
  describe('strings', () => {
    it('should be able to validate strings', () => {
      const toCheck: any = 'a string'
      const validated = isString(toCheck)
      if (validated.isValid()) {
        expect(validated.value).toEqual('a string')
      } else {
        fail()
      }
    })

    it('should be able to show that something is not a string', () => {
      const toCheck: any = 4 
      const validated = isString(toCheck)
      if (validated.isValid()) {
        fail()
      } else {
        expect(validated.errors).toEqual(['Not a `string`'])
      }
    })
  })

  describe('objects', () => {

    const validator = isObject({
      someProperty: isBoolean,
      someOtherProperty: isString
    })

    it('should be able to show that an object has the right structure', () => {
      const toCheck: any = {
        someProperty: true,
        someOtherProperty: 'a string'
      }
      const validated = validator(toCheck)

      if (validated.isValid()) {
        expect(validated.value).toEqual({
          someProperty: true,
          someOtherProperty: 'a string'
        })
      } else {
        fail()
      }
    })

    it('should be able to show that an object doesn\'t have the right structure', () => {
      const toCheck: any = {
        someProperty: 8,
        someOtherProperty: 4 
      }
      const validated = validator(toCheck)

      if (validated.isValid()) {
        fail()
      } else {
        expect(validated.errors).toEqual([
          'Not a `boolean`',
          'Not a `string`'
        ])
      } 
    })
  })
})