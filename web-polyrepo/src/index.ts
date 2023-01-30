import { fooFunc, fooName, useless, tom, Person } from './foo'

export interface User {
  name: string
  age: number
}

function sayHello() {
  console.log('hello world')

  const jerry: Person = {
    name: 'jerry',
    age: 22,
  }

  console.log(tom.name, jerry.name)
}

sayHello()
fooFunc()

export { fooFunc } from './foo'

export default sayHello
