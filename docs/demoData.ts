import { faker } from '@faker-js/faker';

export type Data = {
  id: number;
  text: string;
  cat: string;
  fish: string;
  city: string;
  value: number;
  date: Date;
  bool: boolean;
};

function genFakerData(_: unknown, i: number) {
  return {
    id: i + 1,
    text: faker.lorem.lines(),
    cat: faker.animal.cat(),
    fish: faker.animal.fish(),
    city: faker.address.city(),
    value: faker.datatype.number(),
    date: faker.datatype.datetime(),
    bool: faker.datatype.boolean(),
  };
}

export const demoData: Data[] = new Array(10_005).fill({}).map(genFakerData);
