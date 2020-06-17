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

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('');
    rows.push(createRow(cells, (row + 1)));
  }

  return rows.join('');
}

function toChar(_, index) {
  return String.fromCharCode(CODES.a + index);
}

function createCol(data, index) {
  return `
    <div class="column" data-type="resizable" data-col=${index}>
      ${data}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createCell(row) {
  return (_, col) => `
    <div
      class="cell"
      data-type="cell"
      data-col="${col}"
      data-id="${row}:${col}"
      contenteditable=""
    ></div>
  `;
}

function createRow(data = [], index) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resizer}
      </div>
      <div class="row-data">${data}</div>
    </div>
  `;
}
