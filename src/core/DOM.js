import {
  isBlank,
} from '@/helpers';

class DOM {
  constructor(element) {
    this.node = typeof element === 'string' ?
      document.querySelector(element) :
      element;
  }

  get data() {
    return this.node.dataset;
  }

  focus() {
    this.node.focus();
  }

  html(html) {
    if (typeof html === 'string') {
      this.node.innerHTML = html;
      return this;
    }
    return this.node.innerHTML.trim();
  }

  text(text) {
    let type = 'textContent';
    if (this.node.tagName.toLowerCase() === 'input') {
      type = 'value';
    }
    if (typeof text === 'string') {
      this.node[type] = text;
      return this;
    }
    return this.node[type].trim();
  }

  on(eventType, callback) {
    this.node.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.node.removeEventListener(eventType, callback);
  }

  append(element) {
    if (element instanceof DOM) {
      element = element.node;
    }
    if (Element.prototype.append) {
      this.node.append(element);
    } else {
      this.node.appendChild(element);
    }
    return this;
  }

  find(selector) {
    return $(this.node.querySelector(selector));
  }

  findAll(selector) {
    return this.node.querySelectorAll(selector);
  }

  closest(selector) {
    return $(this.node.closest(selector));
  }

  getCoords() {
    return this.node.getBoundingClientRect();
  }

  addClass(classes) {
    this.node.classList.add(classes);
  }

  toggleClass(className) {
    this.node.classList.toggle(className);
  }

  removeClass(classes) {
    this.node.classList.remove(classes);
  }

  css(style = {}) {
    if (typeof style === 'string') {
      const styles = getComputedStyle(this.node);
      return styles[style];
    } else {
      return Object.assign(this.node.style, style);
    }
  }

  clear() {
    this.html('');
    return this;
  }
}

export function $(element) {
  return new DOM(element);
}

$.create = (tagName, classNames = []) => {
  const element = document.createElement(tagName);
  if (!isBlank(classNames)) {
    element.classList.add(...classNames);
  }
  return new DOM(element);
};
