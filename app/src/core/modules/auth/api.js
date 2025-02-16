import { createHeaders } from "../../utils/api";

const login = (data) => {
    return fetch(`${import.meta.env.VITE_APP_BASE_API}/login`, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(data),
    });
};

export { login };