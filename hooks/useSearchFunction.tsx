/**
 * Search for items in an array of objects based on a keyword and a specific property. Sample usage in Drug Section
 *
 * @param {T[]} array - The array of objects to search through.
 * @param {string} keyword - The keyword to search for.
 * @param {keyof T} searchKey - The key of the object property to search within.
 * @returns {T[] | undefined} An array of matching objects or undefined if keyword is empty.
 */
export function searchFunction<T>(
  array: T[],
  keyword: string,
  searchKeys: string[], // Now an array of keys (including nested keys)
): T[] | undefined {
  if (!keyword) {
    return undefined;
  }

  const newData = array.filter((item) => {
    // Check if any key matches the keyword
    return searchKeys.some((key) => {
      const itemData = getNestedValue(item, key);
      const itemDataString = itemData ? String(itemData).toUpperCase() : '';
      const text = keyword.toUpperCase();
      return itemDataString.includes(text);
    });
  });

  return newData;
}

// Helper function to get the value of a nested property
function getNestedValue(obj: any, key: string): any {
  return key
    .split('.')
    .reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}
