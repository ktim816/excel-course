import {
  $,
} from '@/core';

export function handleResize(e, root) {
  let body;
  let parent;
  let resizer;
  let coords;
  let cells;
  let type;

  if (e.target.dataset.resize) {
    body = $(document.body);
    resizer = $(e.target);
    resizer.addClass('active');
    type = resizer.data.resize;
    body.addClass(`cursor--${type}-resize`);
    parent = resizer.closest('[data-type="resizable"]');
    const index = parent.data.col;
    cells = root.findAll(`[data-col="${index}"]`);
    coords = parent.getCoords();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseUp() {
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
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(e) {
    if (type === 'row') {
      const delta = e.pageY - coords.bottom;
      resizer.css({bottom: -delta + 'px'});
    } else if (type === 'col') {
      const delta = e.pageX - coords.right;
      resizer.css({right: -delta + 'px'});
    }
  }
}
