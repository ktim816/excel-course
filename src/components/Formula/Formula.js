import {
  $,
  ExcelComponent,
} from '@/core';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor(root, options) {
    super(root, {
      name: 'Formula',
      listeners: [
        'input',
        'keydown',
      ],
      ...options,
    });
  }

  init() {
    super.init();
    this.formula = this.root.find('[contenteditable]');
    const getText = (target) => {
      this.formula.text(target.text());
    };
    this.listen('table:select', getText);
    this.listen('table:input', getText);
  }

  onInput(e) {
    this.emit('formula:input', $(e.target).text());
  }

  onKeydown(event) {
    const {key} = event;
    const keys = ['Enter', 'Tab'];
    if (keys.includes(key)) {
      event.preventDefault();
      this.emit('formula:done');
    }
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}
