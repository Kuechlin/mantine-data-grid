import { Radio, SegmentedControl, Text } from '@mantine/core';
import { DataGridFilterFn, DataGridFilterProps } from '../types';

type FilterState = {
  op: BooleanFilterOperator;
  value: boolean;
};

export enum BooleanFilterOperator {
  Equals = 'eq',
}

const toValue = (value: boolean) => (value ? 'true' : 'false');
const toState = (value: string): boolean => (value === 'true' ? true : false);

type BooleanInputProps = DataGridFilterProps<FilterState> & {
  trueLabel: string;
  falseLabel: string;
};

const BooleanSegmentedInput = ({ filter, onFilterChange, trueLabel, falseLabel }: BooleanInputProps) => (
  <SegmentedControl
    value={toValue(filter.value)}
    onChange={(value) => onFilterChange({ ...filter, value: toState(value) })}
    data={[
      { label: trueLabel, value: 'true' },
      { label: falseLabel, value: 'false' },
    ]}
    fullWidth
    styles={{
      active: {
        // fix visual bug when opening filter dropdown
        height: 'calc(100% - 8px) !important',
      },
    }}
  />
);
const BooleanRadioInput = ({ filter, onFilterChange, trueLabel, falseLabel }: BooleanInputProps) => (
  <Radio.Group value={toValue(filter.value)} onChange={(value) => onFilterChange({ ...filter, value: toState(value) })}>
    <Radio value="true" label={trueLabel} />
    <Radio value="false" label={falseLabel} />
  </Radio.Group>
);

export type BooleanFilterOptions = {
  title?: string;
  variant?: 'segmented' | 'radio';
  trueLabel?: string;
  falseLabel?: string;
};
export const createBooleanFilter = ({
  title,
  variant = 'segmented',
  trueLabel = 'true',
  falseLabel = 'false',
}: BooleanFilterOptions) => {
  const filterFn: DataGridFilterFn<any, FilterState> = (row, columnId, filter: FilterState) => {
    const rowValue = Boolean(row.getValue(columnId));
    const op = filter.op || BooleanFilterOperator.Equals;
    const filterValue = Boolean(filter.value);
    switch (op) {
      case BooleanFilterOperator.Equals:
        return rowValue === filterValue;
      default:
        return true;
    }
  };

  filterFn.autoRemove = (val) => !val;

  filterFn.init = () => ({
    op: BooleanFilterOperator.Equals,
    value: true,
  });

  filterFn.element = function BooleanFilter(props) {
    return (
      <>
        {title && <Text>{title}</Text>}
        {variant === 'segmented' ? (
          <BooleanSegmentedInput trueLabel={trueLabel} falseLabel={falseLabel} {...props} />
        ) : (
          <BooleanRadioInput trueLabel={trueLabel} falseLabel={falseLabel} {...props} />
        )}
      </>
    );
  };

  return filterFn;
};

export const booleanFilterFn = createBooleanFilter({});
