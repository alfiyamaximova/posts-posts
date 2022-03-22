import { getSecurityToken } from '../security/auth';

const baseUrl = 'https://api.react-learning.ru/users';

export async function getCurrentUser() {
    const token = getSecurityToken();

    const response = await fetch(`${baseUrl}/me`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response?.json();
}
