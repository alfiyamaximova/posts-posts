import { doRequest } from '../utils/service-utils';

const baseUrl = 'https://api.react-learning.ru/posts';

export async function getAllPosts() {
    return doRequest(baseUrl, 'GET');
}

export async function getPostById(id) {
    return doRequest(`${baseUrl}/${id}`, 'GET');
}

export async function createPost(newPost) {
    return doRequest(baseUrl, 'POST', newPost);
}

export async function updatePost(updatedPost) {
    return doRequest(`${baseUrl}/${updatedPost._id}`, 'PATCH', updatedPost);
}

export async function deletePost(postId) {
    return doRequest(`${baseUrl}/${postId}`, 'DELETE');
}
