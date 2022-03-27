export function isBlank(str) {
    return !str || str.trim().length === 0;
}

export function isNotBlank(str) {
    return !isBlank(str);
}

export function areEqualIgnoringCase(str1, str2) {
    if (!str1 && !str2) {
        return true;
    }

    if (!str1 || !str2) {
        return false;
    }

    return str1.toUpperCase() === str2.toUpperCase();
}
