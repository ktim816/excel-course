export const getParsedId = (id) => {
  const parsed = id.split(':');
  return {
    row: +parsed[0],
    col: +parsed[parsed.length - 1],
  };
};
