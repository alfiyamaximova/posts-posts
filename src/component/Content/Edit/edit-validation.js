import { isBlank } from '../../../utils/string-utils';
import { areEqualIgnoreOrder } from '../../../utils/array-utils';
import { tagsStringToArray } from './edit-utils';

export function someMandatoryFieldIsBlank(formData) {
    return isBlank(formData.title) || isBlank(formData.text) || isBlank(formData.tags);
}

export function sourcePostNotChanged(sourcePost, formData) {
    if (sourcePost.title !== formData.title) {
        return false;
    }

    if (sourcePost.text !== formData.text) {
        return false;
    }

    return areEqualIgnoreOrder(sourcePost.tags, tagsStringToArray(formData.tags));
}
