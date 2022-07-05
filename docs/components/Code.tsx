import { Prism } from '@mantine/prism';

const code = `
import { DataGrid, DataGridFilterFn } from 'mantine-data-grid';

// custom filter
const catFilter: DataGridFilterFn = (row, columnId, filter) => {
    const rowValue = String(row.getValue(columnId));
    return Array.isArray(filter) ? filter.includes(rowValue) : false;
};
catFilter.autoRemove = (val) => !val;
catFilter.init = () => [];
catFilter.element = function ({ filter, onFilterChange }) {
    return (
        <MultiSelect
            data={[
                { value: 'Peterbald', label: 'Peterbald' },
                { value: 'Chartreux', label: 'Chartreux' },
                { value: 'Highlander', label: 'Highlander' },
                { value: 'Savannah', label: 'Savannah' },
                { value: 'Birman', label: 'Birman' },
                { value: 'Burmese', label: 'Burmese' },
                { value: 'Siberian', label: 'Siberian' },
            ]}
            value={filter || []}
            onChange={onFilterChange}
            placeholder="Filter value"
        />
    );
};

// data grid
function Demo() {
    return (
        <DataGrid
            data={/* data source */}
            filterFns={{
                catFilter,
            }}
            columns={(table) => [
                table.createDataColumn('text', {
                    header: () => 'Text that is too long for a Header',
                    filterFn: 'stringFilterFn',
                }),
                table.createGroup({
                    header: 'Animal',
                    columns: [
                        table.createDataColumn('cat', {
                            filterFn: 'catFilter',
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
                    cell: ({ cell }) =>
                        cell.getValue().toLocaleDateString(),
                    filterFn: 'dateFilterFn',
                }),
            ]}
            size={state.size as any}
            noEllipsis={state.ellipsis}
            withGlobalFilter={state.withGlobalFilter}
        />
    );
}
`;

export default function Code() {
    return <Prism withLineNumbers language="tsx" children={code} />;
}
