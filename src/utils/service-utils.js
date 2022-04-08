import { getSecurityToken } from '../security/auth';

export async function doRequest(url, method, body) {
    const token = getSecurityToken();

    const init = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    if (body !== undefined) {
        init.body = JSON.stringify(body)
    }

    return await fetch(url, init)
        .then(response => {

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        });
}
