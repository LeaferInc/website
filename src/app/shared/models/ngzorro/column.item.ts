import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';

export interface ColumnItem {
    name: string;
    sortOrder?: NzTableSortOrder;
    sortFn?: NzTableSortFn;
    listOfFilter?: NzTableFilterList;
    filterFn?: NzTableFilterFn;
    filterMultiple?: boolean;
    sortDirections?: NzTableSortOrder[];
}