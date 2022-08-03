import {
  createBooleanFilter,
  createDateFilter,
  createNumberFilter,
  createStringFilter,
  DataGrid,
  DateFilterOperator,
  highlightFilterValue,
} from '../../../src';
import CodeDemo from '../../components/CodeDemo';
import { Data, demoData } from '../../demoData';

const segmentedBooleanFilter = createBooleanFilter({
  title: 'Filter with german labels',
  variant: 'segmented',
  trueLabel: 'Yes',
  falseLabel: 'No',
});
const radioBooleanFilter = createBooleanFilter({
  variant: 'radio',
  trueLabel: 'Ja',
  falseLabel: 'Nein',
});
const stringFilter = createStringFilter({
  title: 'Filter with german labels',
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
const dateRangeFilter = createDateFilter({
  title: 'Fixed date range filter',
  fixedOperator: DateFilterOperator.Range,
  placeholder: 'Select date',
});
const numberFilter = createNumberFilter({
  title: 'Number Filter',
});

export default function FilersExample() {
  return (
    <CodeDemo code={grid_usage}>
      <DataGrid<Data>
        data={demoData}
        withPagination
        withColumnFilters
        columns={[
          {
            accessorKey: 'text',
            header: 'String filter',
            filterFn: stringFilter,
            size: 300,
            cell: highlightFilterValue,
          },
          { accessorKey: 'value', filterFn: numberFilter },
          {
            accessorKey: 'date',
            header: 'Date range filter',
            cell: (cell) => cell.getValue<Date>()?.toLocaleDateString(),
            filterFn: dateRangeFilter,
          },
          {
            accessorKey: 'bool',
            header: 'Segmented filter',
            filterFn: segmentedBooleanFilter,
          },
          {
            id: 'bool1',
            accessorKey: 'bool',
            header: 'Radio filter',
            filterFn: radioBooleanFilter,
          },
        ]}
      />
    </CodeDemo>
  );
}
const grid_usage = `
import {
  createBooleanFilter,
  createDateFilter,
  createNumberFilter,
  createStringFilter,
  DataGrid,
  DateFilterOperator,
  highlightFilterValue,
} from 'mantine-data-grid';

const segmentedBooleanFilter = createBooleanFilter({
  title: 'Filter with german labels',
  variant: 'segmented',
  trueLabel: 'Ja',
  falseLabel: 'Nein',
});
const radioBooleanFilter = createBooleanFilter({
  variant: 'radio',
  trueLabel: 'Yes',
  falseLabel: 'No',
});
const stringFilter = createStringFilter({
  title: 'Filter with german labels',
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
const dateRangeFilter = createDateFilter({
  title: 'Fixed date range filter',
  fixedOperator: DateFilterOperator.Range,
  placeholder: 'Select date',
});
const numberFilter = createNumberFilter({
  title: 'Number Filter',
});

export function Demo() {
  return (
    <DataGrid<Data>
      data={demoData}
      withPagination
      withColumnFilters
      columns={[
        {
          accessorKey: 'text',
          header: 'String filter',
          filterFn: stringFilter,
          size: 300,
          cell: highlightFilterValue,
        },
        { accessorKey: 'value', filterFn: numberFilter },
        {
          accessorKey: 'date',
          header: 'Date range filter',
          cell: (cell) => cell.getValue<Date>()?.toLocaleDateString(),
          filterFn: dateRangeFilter,
        },
        {
          accessorKey: 'bool',
          header: 'Segmented filter',
          filterFn: segmentedBooleanFilter,
        },
        {
          id: 'bool1',
          accessorKey: 'bool',
          header: 'Radio filter',
          filterFn: radioBooleanFilter,
        },
      ]}
    />
  );
}
`;
