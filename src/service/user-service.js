import { doRequest } from '../utils/service-utils';

const baseUrl = 'https://api.react-learning.ru/users';

export async function getLoggedInUser() {
    return doRequest(`${baseUrl}/me`, 'GET');
}

export async function getAllUsers() {
    return doRequest(baseUrl, 'GET');
}
