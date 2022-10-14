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
      { name: 'fixedOperator', type: 'StringFilterOperator', description: 'Fixed filter operator' },
      {
        name: 'labels',
        type: 'Partial<Record<StringFilterOperator, string>>',
        description: 'Lables for filter operators',
      },
      { name: 'placeholder', type: 'string', description: 'Placeholder in input element, defaults to "Filter value"' },
    ],
    example: `
import { createStringFilter } from 'mantine-data-grid';

const stringFilter = createStringFilter({
  title: 'Suchen',
  labels: {
    eq: 'Ist gleich',
    in: 'Enthält',
    start: 'Startet mit',
    end: 'Endet mit',
    neq: 'Nicht gleich',
    nin: 'Enthält nicht',
  },
  placeholder: 'Text eingeben',
});
`,
  },
  {
    title: 'Number filter',
    options: [
      { name: 'title', type: 'string', description: 'Title in filter dropdown' },
      { name: 'fixedOperator', type: 'NumberFilterOperator', description: 'Fixed filter operator' },
      {
        name: 'labels',
        type: 'Partial<Record<NumberFilterOperator, string>>',
        description: 'Labels for filter operators',
      },
      { name: 'placeholder', type: 'string', description: 'Placeholder in input element, defaults to "Filter value"' },
    ],
    example: `
import { createNumberFilter } from 'mantine-data-grid';

const numberFilter = createNumberFilter({
  title: 'Numbers',
  fixedOperator: NumberFilterOperator.Equals,
  labels: {
    bet: "Zwischen",
    beteq: "Von bis",
    nbet: "Nicht zwischen",
    nbeteq: "Nicht von bis",
    eq: "Gleich",
    gt: "Größer als",
    gte: "Größer gleich",
    lt: "Kleiner als",
    lte: "Kleiner gleich",
    neq: "Nicht gleich"}
  placeholder: 'Enter number',
});
`,
  },
  {
    title: 'Date filter',
    options: [
      { name: 'title', type: 'string', description: 'Title in filter dropdown' },
      { name: 'fixedOperator', type: 'DateFilterOperator', description: 'Fixed filter operator' },
      {
        name: 'labels',
        type: 'Partial<Record<DateFilterOperator, string>>',
        description: 'Lables for filter operators',
      },
      { name: 'placeholder', type: 'string', description: 'Placeholder in input element, defaults to "Filter value"' },
    ],
    example: `
import { createDateFilter } from 'mantine-data-grid';

const numberFilter = createDateFilter({
  title: 'Dates',
  placeholder: 'Enter Date',
  labels: {
    eq: 'Equals Exact'
  }
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
