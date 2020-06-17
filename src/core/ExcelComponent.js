import {
  DOMListener,
} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor(root, options = {}) {
    super(root, options);
    this.emitter = options.emitter;
    this.unsubs = [];
    this.prepare();
  }

  // Настраиваем компонент до init
  prepare() {}

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners();
  }

  emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  listen(event, callback) {
    const unsub = this.emitter.subscribe(event, callback);
    this.unsubs.push(unsub);
  }

  unsubscribe() {
    this.unsubs.forEach((unsub) => {
      unsub();
    });
  }

  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners();
    this.unsubscribe();
  }

  toHTML() {
    return '';
  }
}
