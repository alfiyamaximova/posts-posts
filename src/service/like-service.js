import { getSecurityToken } from '../security/auth';

const baseUrl = 'https://api.react-learning.ru/posts/likes';

export async function putLike(postId) {
    const token = getSecurityToken();

    const response = await fetch(`${baseUrl}/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response?.json();
}

export async function removeLike(postId) {
    const token = getSecurityToken();

    const response = await fetch(`${baseUrl}/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response?.json();
}
