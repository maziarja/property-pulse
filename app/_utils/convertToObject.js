// export function convertToObject(leanDoc) {
//   for (const key of Object.keys(leanDoc)) {
//     if (leanDoc[key].toJSON && leanDoc[key].toString) {
//       leanDoc[key] = leanDoc[key].toString();
//     }
//   }
//   return leanDoc;
// }

export function convertToObject(value) {
  if (Array.isArray(value)) {
    return value.map(convertToObject);
  }

  if (value && typeof value === "object") {
    // Handle known BSON types
    if (
      value._bsontype === "ObjectID" &&
      typeof value.toString === "function"
    ) {
      return value.toString();
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    if (
      Buffer.isBuffer(value) ||
      "buffer" in value ||
      typeof value.toJSON === "function"
    ) {
      return value.toString(); // or null, depending on how you want to handle buffers
    }

    const plain = {};
    for (const key in value) {
      plain[key] = convertToObject(value[key]);
    }
    return plain;
  }

  return value;
}
