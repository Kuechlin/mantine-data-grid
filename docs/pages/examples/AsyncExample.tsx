import { useEffect, useState } from 'react';
import { Badge } from 'tabler-icons-react';
import {
  booleanFilterFn,
  DataGrid,
  DataGridPaginationState,
  dateFilterFn,
  highlightFilterValue,
  numberFilterFn,
  OnChangeCallback,
  stringFilterFn,
} from '../../../src';
import { Data, demoData } from '../../demoData';

type FetchResponse = {
  list: Data[];
  total: number;
};

function fetchData(page: number, pageSize: number, search: string): Promise<FetchResponse> {
  return new Promise((resolve) =>
    setTimeout(() => {
      const data = demoData.filter(
        (x) => x.text.includes(search) || x.cat.includes(search) || x.fish.includes(search) || x.city.includes(search)
      );
      resolve({
        list: data.slice(page * pageSize, page * pageSize + pageSize),
        total: data.length + 2,
      });
    }, 1000)
  );
}

export default function AsyncExample() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchResponse>({ list: [], total: 0 });
  const [searchValue, setSearchValue] = useState<string>('');

  const load: OnChangeCallback<DataGridPaginationState> = async ({ pageIndex, pageSize }) => {
    console.log(`pageIndex: ${pageIndex}, pageSize: ${pageSize}`);
    setLoading(true);
    const res = await fetchData(pageIndex, pageSize, searchValue);
    setData(res);
    setLoading(false);
  };

  const search: OnChangeCallback<string> = async (val) => {
    console.log(`search`);
    setLoading(true);
    const res = await fetchData(0, 10, val);
    setData(res);
    setSearchValue(val);
    setLoading(false);
  };

  useEffect(() => {
    load({ pageIndex: 0, pageSize: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataGrid<Data>
      data={data.list}
      total={data.total}
      onPageChange={load}
      onSearch={search}
      withPagination
      withGlobalFilter
      loading={loading}
      columns={[
        {
          accessorKey: 'id',
          header: 'No',
          size: 60,
        },
        {
          accessorKey: 'text',
          header: 'Text that is too long for a Header',
          filterFn: stringFilterFn,
          size: 300,
          cell: highlightFilterValue,
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
          cell: (cell) => cell.getValue<Date>()?.toLocaleDateString(),
          filterFn: dateFilterFn,
        },
        {
          accessorKey: 'bool',
          cell: (cell) => {
            if (cell.getValue()) {
              return <Badge color="teal">true</Badge>;
            }
            return <Badge color="red">false</Badge>;
          },
          filterFn: booleanFilterFn,
        },
      ]}
    />
  );
}
