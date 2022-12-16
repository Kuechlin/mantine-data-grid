import { Card, Divider, Stack, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { PropertyTable } from '../components/PropertyTable';

export default function Filters() {
  return (
    <Stack p="md">
      <Title order={2} style={{ display: 'flex' }}>
        Column filters
      </Title>
      {filters.map((filter, i) => (
        <Card key={i}>
          <Stack spacing="xs">
            <Title order={3}>{filter.title}</Title>
            <Card.Section>
              <Divider />
            </Card.Section>
            <Title order={4}>Options</Title>
            <PropertyTable items={filter.options} />
            <Prism withLineNumbers language="tsx" children={filter.example} />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}

const filters = [
  {
    title: 'String filter',
    options: [
      { name: 'title', type: 'string', description: 'Title in filter dropdown' },
      { name: 'operators', type: 'FilterOperator[]', description: 'Filter operators' },
      { name: 'placeholder', type: 'string', description: 'Placeholder in input element, defaults to "Filter value"' },
    ],
    example: `
import { createStringFilter } from 'mantine-data-grid';

const stringFilter = createStringFilter({
  title: 'Suchen',
  placeholder: 'Text eingeben',
  operators: [
    stringOperators.includes('Enthält'),
    stringOperators.notIncludes('Enthält nicht'),
    stringOperators.equals('Ist gleich'),
    stringOperators.notEquals('Nicht gleich'),
    stringOperators.startsWith('Startet mit'),
    stringOperators.endsWith('Endet mit'),
  ],
});
`,
  },
  {
    title: 'Number filter',
    options: [
      { name: 'title', type: 'string', description: 'Title in filter dropdown' },
      { name: 'operators', type: 'FilterOperator[]', description: 'Filter operators' },
      { name: 'placeholder', type: 'string', description: 'Placeholder in input element, defaults to "Filter value"' },
    ],
    example: `
import { createNumberFilter } from 'mantine-data-grid';

const numberFilter = createNumberFilter({
  title: 'Filtern',
  placeholder: 'Nummer eingeben',
  operators: [
    numberOperators.equals("Gleich"),
    numberOperators.notEquals("Nicht gleich"),
    numberOperators.greaterThan("Größer als"),
    numberOperators.greaterThanOrEquals("Größer gleich"),
    numberOperators.lowerThan("Kleiner als"),
    numberOperators.lowerThanOrEquals("Kleiner gleich"),
    numberOperators.between("Zwischen"),
    numberOperators.betweenOrEquals("Von bis"),
    numberOperators.notBetween("Nicht zwischen"),
    numberOperators.notBetweenOrEquals("Nicht von bis"),
  ],
});
`,
  },
  {
    title: 'Date filter',
    options: [
      { name: 'title', type: 'string', description: 'Title in filter dropdown' },
      { name: 'operators', type: 'FilterOperator[]', description: 'Filter operators' },
      { name: 'placeholder', type: 'string', description: 'Placeholder in input element, defaults to "Filter value"' },
    ],
    example: `
import { createDateFilter } from 'mantine-data-grid';

const dateFilter = createDateFilter({
  title: 'Dates',
  placeholder: 'Enter Date',
  operators: [
    numberOperators.equals(),
  ]
});
`,
  },
  {
    title: 'Boolean filter',
    options: [
      { name: 'title', type: 'string', description: 'Title in filter dropdown' },
      { name: 'variant', type: "'segmented' | 'radio'", description: "Input variant, defaults to 'segmented'" },
      { name: 'trueLabel', type: 'string', description: 'true label' },
      { name: 'falseLabel', type: 'string', description: 'false label' },
    ],
    example: `
import { createBooleanFilter } from 'mantine-data-grid';

const booleanFilter = createBooleanFilter({
  title: 'Boolen',
  trueLabel: 'Yes',
  falseLabel: 'No',
  variant: 'radio'
});
`,
  },
];
