import {
  ExcelComponent,
} from '@/core';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor(root) {
    super(root, {
      name: 'Formula',
      listeners: [
        'input',
        'click',
      ],
    });
  }

  onClick(e) {
    console.log(this);
    console.log('Formula: onClick', e);
  }

  onInput(e) {
    console.log('Formula: onInput', e);
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
