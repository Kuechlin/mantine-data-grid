import { createStringFilter, DataGrid, highlightFilterValue, stringOperators } from '../../../src';
import { demoData } from '../../demoData';

const stringFilterFn = createStringFilter({
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

export default function LocaleExample() {
  return (
    <DataGrid
      data={demoData}
      striped
      highlightOnHover
      withGlobalFilter
      withPagination
      withColumnFilters
      withSorting
      withColumnResizing
      locale={{
        globalSearch: 'Suchen...',
        pageSize: 'Zeilen pro Seite:',
        pagination: (firstRowNum, lastRowNum, maxRows) => (
          <>
            Es werden <b>{firstRowNum}</b> - <b>{lastRowNum}</b> von <b>{maxRows}</b> Ergebnissen angezeigt
          </>
        ),
      }}
      columns={[
        {
          accessorKey: 'text',
          header: 'Text',
          filterFn: stringFilterFn,
          size: 300,
          cell: highlightFilterValue,
        },
        {
          header: 'Tier',
          columns: [
            { accessorKey: 'cat', header: 'Katze', filterFn: stringFilterFn },
            {
              accessorKey: 'fish',
              header: 'Fisch',
              filterFn: stringFilterFn,
            },
          ],
        },
        {
          accessorKey: 'city',
          header: 'Stadt',
          filterFn: stringFilterFn,
        },
      ]}
    />
  );
}
