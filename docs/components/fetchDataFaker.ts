import faker from '@faker-js/faker'
import { Data } from './types'

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newData = (): Data => {
  return {
    text: faker.lorem.lines(),
    cat: faker.animal.cat(),
    fish: faker.animal.fish(),
    city: faker.address.city(),
    value: faker.datatype.number(),
    date: faker.datatype.datetime(),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Data[] => {
    const len = lens[depth]!
    return range(len).map((d): Data => {
      return {
        ...newData(),
      }
    })
  }

  return makeDataLevel()
}

const data = makeData(10000)

export async function fetchDataFaker(options: {
  pageIndex: number
  pageSize: number
}) {
  // Simulate some network latency
  await new Promise(r => setTimeout(r, 500))

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
  }
}
