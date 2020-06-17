import {
  range,
} from '@/helpers';

export function matrix(target, current) {
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}
