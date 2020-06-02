import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';

export const isBlank = (value) => {
  return isEmpty(value) && (!isNumber(value) || !isNaN(value));
};
