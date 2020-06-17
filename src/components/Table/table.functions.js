import {
  ROWS_LENGTH,
} from '@/constants';

export const nextSelector = (key, {row, col}) => {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row <= ROWS_LENGTH - 2 && row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col > MIN_VALUE && col--;
      break;
    case 'ArrowUp':
      row > MIN_VALUE && row--;
      break;
  }
  return `[data-id="${row}:${col}"]`;
};
