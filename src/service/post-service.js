import { getSecurityToken } from '../security/auth';

const baseUrl = 'https://api.react-learning.ru/posts';

export async function getAllPosts() {
    const token = getSecurityToken();

    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response?.json();
}

export async function getPostById(id) {
    const token = getSecurityToken();

    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response?.json();
}

export async function createPost(newPost) {
    const token = getSecurityToken();

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(newPost)
    });

    return response?.json();
}
