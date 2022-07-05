# Mantine Data Grid

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
import { DataGrid } from 'mantine-data-grid';

function Demo() {
    return (
        <DataGrid
            data={/* data source */}
            size="md"
            withGlobalFilter
            columns={(table) => [
                table.createDataColumn('text', {
                    header: () => 'Text that is too long for a Header',
                    filterFn: 'stringFilterFn',
                }),
                table.createGroup({
                    header: 'Animal',
                    columns: [
                        table.createDataColumn('cat', {
                            filterFn: 'stringFilterFn',
                        }),
                        table.createDataColumn('fish', {
                            filterFn: 'stringFilterFn',
                        }),
                    ],
                }),
                table.createDataColumn('city', {
                    filterFn: 'stringFilterFn',
                }),
                table.createDataColumn('value', {
                    filterFn: 'numberFilterFn',
                }),
                table.createDataColumn('date', {
                    cell: ({ cell }) => cell.getValue().toLocaleDateString(),
                    filterFn: 'dateFilterFn',
                }),
            ]}
        />
    );
}
```

## Run locally

    pnpm i

    pnpm dev

## Roadmap

-   [x] Simple Data Grid
-   [x] Virualized Data Grid
-   [x] Global Filter
-   [x] Column Filter
    -   [x] string filter
    -   [x] number filter
    -   [x] date filter
    -   [x] custom fitler
-   [x] Column Sizing
-   [x] Column sorting
-   [ ] Scrolling
    -   [ ] Fixed Header
    -   [ ] Column pinning
-   [ ] Column Ordering
-   [ ] Pagination
-   [x] Styles Api
-   [x] Docs
-   [ ] Create npm package
