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
import CodeDemo from '../CodeDemo';
import { Data, demoData } from '../../demoData';

type FetchResponse = {
  list: Data[];
  total: number;
};

function fetchData(page: number, pageSize: number): Promise<FetchResponse> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          list: demoData.slice(page * pageSize, page * pageSize + pageSize),
          total: demoData.length,
        }),
      1000
    )
  );
}

export default function AsyncExample() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchResponse>({ list: [], total: 0 });

  const load: OnChangeCallback<DataGridPaginationState> = async ({ pageIndex, pageSize }) => {
    console.log(`pageIndex: ${pageIndex}, pageSize: ${pageSize}`);
    setLoading(true);
    const res = await fetchData(pageIndex, pageSize);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    load({ pageIndex: 0, pageSize: 10 });
  }, []);

  return (
    <CodeDemo code={async_code}>
      <DataGrid<Data>
        data={data.list}
        total={data.total}
        onPageChange={load}
        withPagination
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
    </CodeDemo>
  );
}

const async_code = `
type FetchResponse = {
    list: Data[];
    total: number;
};

function fetchData(page: number, pageSize: number): Promise<FetchResponse> {
    return new Promise((resolve) =>
        setTimeout(
            () =>
                resolve({
                    list: demoData.slice(
                        page * pageSize,
                        page * pageSize + pageSize
                    ),
                    total: demoData.length,
                }),
            100
        )
    );
}

export default function AsyncExample() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<FetchResponse>({ list: [], total: 0 });

    const load: OnChangeCallback<DataGridPaginationState> = async ({
        pageIndex,
        pageSize,
    }) => {
        setLoading(true);
        var res = await fetchData(pageIndex, pageSize);
        setData(res);
        setLoading(false);
    };

    useEffect(() => {
        load({ pageIndex: 0, pageSize: 10 });
    }, []);

    return (
        <DataGrid<Data>
            data={data.list}
            total={data.total}
            onPageChange={load}
            withPagination
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
}`;
