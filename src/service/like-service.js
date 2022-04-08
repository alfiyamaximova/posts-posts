import { doRequest } from '../utils/service-utils';

const baseUrl = 'https://api.react-learning.ru/posts/likes';

export async function putLike(postId) {
    return doRequest(`${baseUrl}/${postId}`, 'PUT');
}

export async function removeLike(postId) {
    return doRequest(`${baseUrl}/${postId}`, 'DELETE');
}
