const CODES = {
  a: 65,
  z: 90,
};

export function createTable(rowsCount = 15) {
  const colsCount = CODES.z - CODES.a + 1;
  const rows = [];
  const cols = Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('');
  const cells = Array(colsCount)
      .fill('')
      .map(createCell)
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, (i + 1)));
  }

  return rows.join('');
}

function toChar(_, index) {
  return String.fromCharCode(CODES.a + index);
}

function createCol(data) {
  return `
    <div class="column">${data}</div>
  `;
}

function createCell() {
  return `
    <div class="cell" contenteditable=""></div>
  `;
}

function createRow(data, num = '') {
  return `
    <div class="row">
      <div class="row-info">${num}</div>
      <div class="row-data">${data}</div>
    </div>
  `;
}
