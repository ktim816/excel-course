import {
  $,
  ExcelComponent,
} from '@/core';

import {
  getParsedId,
} from '@/helpers';

import {
  ROWS_LENGTH,
  KEY_NAMES,
} from '@/constants';

import {
  TableSelection,
} from './TableSelection';

import {
  createTable,
} from './table.template';

import {
  nextSelector,
} from './table.functions';

import {
  handleResize, handleSelect,
} from './table.handlers';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: [
        'mousedown',
        'keydown',
        'input',
      ],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const cell = this.root.find('[data-id="0:0"]');
    this.selectCell(cell);
    this.listen('formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.listen('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell(cell) {
    this.selection.select(cell);
    this.emit('table:select', cell);
  }

  onKeydown(event) {
    const {key, shiftKey} = event;
    if (KEY_NAMES.includes(key) && !shiftKey) {
      event.preventDefault();
      const id = getParsedId(this.selection.current.data.id);
      const next = this.root.find(nextSelector(key, id));
      this.selectCell(next);
    }
  }

  onInput(event) {
    this.emit('table:input', $(event.target));
  }

  onMousedown(e) {
    if (e.target.dataset.resize) {
      handleResize(e, this.root);
    } else if (e.target.dataset.type === 'cell') {
      handleSelect(e, this.root, this.selection);
      this.emit('table:select', $(event.target));
    }
  }

  toHTML() {
    return createTable(ROWS_LENGTH);
  }

  destroy() {
    super.destroy();
  }
}
