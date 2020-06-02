import {
  isBlank,
} from '@/helpers';

class DOM {
  constructor(element) {
    this.node = typeof element === 'string' ?
      document.querySelector(element) :
      element;
  }

  html(html) {
    if (typeof html === 'string') {
      this.node.innerHTML = html;
      return this;
    }
    return this.node.innerHTML.trim();
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
