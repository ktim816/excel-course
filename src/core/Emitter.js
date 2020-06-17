import {
  isArray,
} from '@/helpers';

export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей если они есть
  // table.emit('table:select', {a: 1});
  emit(eventName, ...args) {
    if (!isArray(this.listeners[eventName])) return;
    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
  }

  // on, listen
  // Подписываемся на уведомления
  // Добавляем нового слушателя
  // formula.subsrcibe('table:select' () => {...});
  subscribe(event, callback) {
    if (!isArray(this.listeners[event])) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter((listener) => listener !== callback);
    };
  }
}
