// Экспорт основных компонентов
export { Table } from './Table';
export { TableHead } from './TableHead';
export { TableBody } from './TableBody';
export { TableFooter } from './TableFooter';
export { TableRow } from './TableRow';
export { TableCell } from './TableCell';
export { TableText } from './TableText';

// Экспорт моделей и хуков
export {
  useTable,
  useCheckedRows,
  useTableSorting,
  useTableEditing,
  TableProvider,
} from './model';
