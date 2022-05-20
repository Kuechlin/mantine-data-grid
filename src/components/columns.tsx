import { ColumnOption } from './DataGrid';

export interface StringColumnOptions<T>
    extends Omit<ColumnOption<T>, 'sort' | 'render'> {
    value: (record: T) => string;
}
export function stringColumn<T = any>({
    value,
    ...rest
}: StringColumnOptions<T>): ColumnOption<T> {
    return {
        ...rest,
        render: value,
        sort: (a, b) => value(a).localeCompare(value(b)),
    };
}

export interface DateColumnOptions<T>
    extends Omit<ColumnOption<T>, 'sort' | 'render'> {
    value: (record: T) => Date;
}
export function dateColumn<T = any>({
    value,
    ...rest
}: DateColumnOptions<T>): ColumnOption<T> {
    return {
        ...rest,
        render: (r) => value(r).toDateString(),
        sort: (a, b) => value(a).getTime() - value(b).getTime(),
    };
}

export interface NumberColumnOptions<T>
    extends Omit<ColumnOption<T>, 'sort' | 'render'> {
    value: (record: T) => number;
}
export function numberColumn<T = any>({
    value,
    ...rest
}: NumberColumnOptions<T>): ColumnOption<T> {
    return {
        ...rest,
        render: (r) => value(r),
        sort: (a, b) => value(a) - value(b),
    };
}
