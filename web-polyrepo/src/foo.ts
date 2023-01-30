import mock from './mock.json'

export const fooName = 'foo'

export const useless = 999999

export interface Person {
  name: string
  age: number
}

export const tom: Person = {
  name: 'tom',
  age: 18,
}

export function fooFunc() {
  console.log(1111, fooName, mock)
}
