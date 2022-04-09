export function isEmptyArray(array) {
    return !array || array.length === 0;
}

export function isNotEmptyArray(array) {
    return !isEmptyArray(array);
}

export function areEqualIgnoreOrder(arr1, arr2) {
    if (isEmptyArray(arr1)) {
        if (isEmptyArray(arr2)) {
            return true;
        }

        return false;
    }

    if (isEmptyArray(arr2)) {
        return false;
    }

    if (arr1.length !== arr2.length) {
        return false;
    }

    const data1 = arr1.slice();
    data1.sort();

    const data2 = arr2.slice();
    data2.sort();

    for (let i = 0; i < data1.length; i++) {
        if (data1[i] !== data2[i]) {
            return false;
        }
    }

    return true;
}
