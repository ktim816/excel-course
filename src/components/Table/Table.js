import {
  ExcelComponent,
} from '@/core';

import {
  createTable,
} from './table.template';

import {
  handleResize,
} from './table.handlers';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: [
        'mousedown',
      ],
    });
  }

  onMousedown(e) {
    handleResize(e, this.root);
  }

  toHTML() {
    return createTable(20);
  }
}
