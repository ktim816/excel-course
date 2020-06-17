import {$} from '@/core';

import {
  matrix,
  getParsedId,
} from '@/helpers';

export function handleResize(e, root) {
  const body = $(document.body);
  const resizer = $(e.target);
  resizer.addClass('active');
  const type = resizer.data.resize;
  body.addClass(`cursor--${type}-resize`);
  const parent = resizer.closest('[data-type="resizable"]');
  const index = parent.data.col;
  const cells = root.findAll(`[data-col="${index}"]`);
  const coords = parent.getCoords();

  document.onmousemove = (e) => {
    if (type === 'row') {
      const delta = e.pageY - coords.bottom;
      resizer.css({bottom: -delta + 'px'});
    } else if (type === 'col') {
      const delta = e.pageX - coords.right;
      resizer.css({right: -delta + 'px'});
    }
  };

  document.onmouseup = (e) => {
    resizer.removeClass('active');
    body.removeClass(`cursor--${type}-resize`);
    if (type === 'row') {
      const value = coords.height - parseInt(resizer.css('bottom'));
      parent.css({height: value + 'px'});
      resizer.css({bottom: 0});
    } else if (type === 'col') {
      const value = coords.width - parseInt(resizer.css('right'));
      cells.forEach((cell) => {
        cell.style.width = value + 'px';
      });
      resizer.css({right: 0});
    }
    document.onmousemove = null;
    document.onmouseup = null;
  };
}

export function handleSelect(e, root, selection) {
  const cell = $(e.target);
  if (e.shiftKey) {
    const target = getParsedId(cell.data.id);
    const current = getParsedId(selection.current.data.id);
    const group = matrix(target, current)
        .map((id) => root.find(`[data-id="${id}"]`));
    selection.selectGroup(group);
  } else {
    selection.select(cell);
  }
}
