import {
  isBlank,
} from '@/helpers';

export class DOMListener {
  constructor(root, options) {
    if (!root) {
      throw new Error('No root provided from DOMListener');
    }
    this.root = root;
    this.name = options.name;
    this.listeners = options.listeners;
  }

  initDOMListeners() {
    if (isBlank(this.listeners)) return;
    this.listeners.forEach((eventType, i) => {
      const method = `on${eventType.toPascalCase()}`;
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name} component`);
      }
      this[method] = this[method].bind(this);
      this.root.on(eventType, this[method]);
    });
  }

  removeDOMListeners() {
    if (isBlank(this.listeners)) return;
    this.listeners.forEach((eventType) => {
      const method = `on${eventType.toPascalCase()}`;
      this.root.off(eventType, this[method]);
    });
  }
}
