export const removeByIndex = (list: any[], index: number) =>
  [...list.slice(0, index), list.slice(index + 1, list.length)].flat();
