import { Button } from '@mantine/core';
import { useState } from 'react';
import { DataGrid } from '../../../src';
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

export default function MinimalExample() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchResponse>({ list: [], total: 0 });
  console.log({ loading }, data);

  return (
    <>
      <Button
        onClick={async () => {
          setLoading(true);
          const res = await fetchData(0, 100, '');
          setData(res);
          setLoading(false);
        }}
      >
        Fetch data
      </Button>
      <DataGrid
        data={data.list}
        columns={[
          { header: 'cat', accessorFn: (row) => row.cat },
          { header: 'fish', accessorFn: (row) => row.fish },
          { header: 'city', accessorFn: (row) => row.city },
          { header: 'value', accessorFn: (row) => row.value },
        ]}
        loading={loading}
      />
    </>
  );
}
