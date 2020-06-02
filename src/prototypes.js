String.prototype.toPascalCase = function() {
  return this
      .split(/[\s-_]+/)
      .map((str) => str[0].toUpperCase() + str.slice(1))
      .join('');
};
