import moment from 'moment';

export function formatDateTime(str) {
    const date = moment(new Date(str));

    return date.isValid() ? date.format("DD.MM.YYYY HH:mm:ss") : null;
}
