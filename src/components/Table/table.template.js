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

function createCol(data, index) {
  return `
    <div class="column" data-type="resizable" data-col=${index}>
      ${data}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createCell(_, col) {
  return `
    <div
      class="cell"
      data-col=${col}
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
