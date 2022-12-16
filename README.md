# Mantine Data Grid

[![Version](https://img.shields.io/npm/v/mantine-data-grid?style=flat-square)](https://www.npmjs.com/package/mantine-data-grid)

Data Grid component with [Mantine UI](https://mantine.dev/) and [react-table v8](https://tanstack.com/table/v8/).

Component is in alpha stage, there might be bugs and component api could change.

[Mantine Data Grid discussion](https://github.com/mantinedev/mantine/discussions/1057)

## [Demo & Documentation](https://kuechlin.github.io/mantine-data-grid/)

## Install

With npm

    npm i mantine-data-grid @mantine/core @mantine/dates @mantine/hooks dayjs

With pnpm

    pnpm add mantine-data-grid @mantine/core @mantine/dates @mantine/hooks dayjs

## Usage

```typescript
import { DataGrid, stringFilterFn, numberFilterFn, dateFilterFn } from 'mantine-data-grid';

function Demo() {
  return (
    <DataGrid
      data={/* data source */}
      size="md"
      withGlobalFilter
      columns={[
        {
          accessorKey: 'text',
          header: 'Text that is too long for a Header',
          filterFn: stringFilterFn,
        },
        {
          header: 'Animal',
          columns: [
            { accessorKey: 'cat', filterFn: stringFilterFn },
            {
              accessorKey: 'fish',
              filterFn: stringFilterFn,
            },
          ],
        },
        {
          accessorKey: 'city',
          filterFn: stringFilterFn,
        },
        { accessorKey: 'value', filterFn: numberFilterFn },
        {
          accessorKey: 'date',
          cell: (cell) => cell.getValue()?.toLocaleDateString(),
          filterFn: dateFilterFn,
        },
      ]}
    />
  );
}
```

## Contributing

Contribution to this project is welcom, feel free to submit a Pull Request.

## Run locally

    pnpm i

    pnpm dev

## Roadmap

- [x] Simple Data Grid
- [x] Virualized Data Grid
- [x] Global Filter
- [x] Column Filter
  - [x] string filter
  - [x] number filter
  - [x] date filter
  - [x] boolean filter
  - [x] custom fitler
- [x] Column Sizing
- [x] Column sorting
- [ ] Scrolling
  - [x] Fixed Header
  - [ ] Column pinning
- [ ] Column Ordering
- [x] Row Selection
- [x] Row Expanding
- [x] Pagination
- [x] Styles Api
- [x] Component Overrides
- [x] Docs
- [x] Create npm package
- [ ] Add tests
