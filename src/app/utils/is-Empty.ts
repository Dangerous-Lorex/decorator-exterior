export const isEmpty = (value: any): boolean => {
  if (value == null) {
    return true;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0 && value.constructor === Object) {
    return true;
  }

  if (typeof value === 'number' && value === 0) {
    return true;
  }
  return false;
}