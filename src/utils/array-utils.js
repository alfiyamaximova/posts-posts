export function isEmptyArray(array) {
    return !array || array.length === 0;
}

export function isNotEmptyArray(array) {
    return !isEmptyArray(array);
}