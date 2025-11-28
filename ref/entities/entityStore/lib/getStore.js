
// fn - selector, action
export const getStore = (storeMap, entityKind, key) => {
  if (!entityKind || !storeMap[entityKind]) {
    console.warn(`No store map found for entity type: ${entityKind}`);
    return null;
  }

  const fn = storeMap[entityKind][key];

  if (!fn) {
    console.warn(`No ${key} method found for entity type: ${entityKind}`);
    return null;
  }

  return fn;
};
