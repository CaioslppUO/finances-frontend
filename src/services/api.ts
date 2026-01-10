// Axios
import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

export const api = axios.create({
    baseURL: `${baseURL}`,
});

/**
 * Intercepta requisições da API para usar o access token caso o usuário já esteja logado.
 */
api.interceptors.request.use((config) => {
    const data = localStorage.getItem("authData");

    if (data) {
        const access = JSON.parse(data)["access"];
        config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
});

/**
 * Quando o token vencer, manda o usuário para a página de login.
 */
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Desloga o usuário e manda para a página de login
        if (error.response?.status === 401) {
            // Redireciona o usuário para /login, caso ele já não esteja na página de login
            if (window.location.pathname !== "/login") {
                localStorage.clear();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

// Renovação de token
// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//     failedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });

//     failedQueue = [];
// };

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             // Guarda a requisição para tentar novamente após atualizar o token
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 }).then((token) => {
//                     originalRequest.headers.Authorization = `Bearer ${token}`;
//                     return api(originalRequest);
//                 });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             try {
//                 const refresh = localStorage.getItem("refresh");

//                 const response = await axios.post(`${baseURL}/api/refresh/`, {
//                     refresh,
//                 });

//                 const newAccess = response.data.access;
//                 localStorage.setItem("access", newAccess);

//                 api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;

//                 processQueue(null, newAccess);
//                 return api(originalRequest);
//             } catch (err) {
//                 processQueue(err, null);
//                 localStorage.clear();
//                 // window.location.href = "/login";
//                 return Promise.reject(err);
//             } finally {
//                 isRefreshing = false;
//             }
//         }

//         return Promise.reject(error);
//     }
// );
