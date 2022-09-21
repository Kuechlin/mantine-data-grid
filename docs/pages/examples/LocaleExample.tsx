import { createStringFilter, DataGrid, highlightFilterValue } from '../../../src';
import { demoData } from '../../demoData';

const stringFilterFn = createStringFilter({
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
