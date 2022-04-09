import { isBlank } from '../../../utils/string-utils';
import { isEmptyArray } from '../../../utils/array-utils';

const DELIMITER = ' ';

export function tagsStringToArray(str) {
    if (isBlank(str)) {
        return [];
    }

    return str.split(DELIMITER).map(tag => tag.trim());
}

export function tagsArrayToString(arr) {
    if (isEmptyArray(arr)) {
        return '';
    }

    return arr.join(DELIMITER);
}
