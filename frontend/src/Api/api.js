import axios from "axios";
const baseUrl = "http://localhost:8080";
//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
    (config) => {
        // config.headers['Content-Type'] = 'application/json'
        // config.headers['Access-Control-Allow-Origin'] = '*'
        config.validateStatus = function (status) {
            return status >= 200 && status < 500
        }
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["x-access-token"] = accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            return axios
                .post(`${baseUrl}/refresh_token`)
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem("accessToken", res.data.accessToken);
                        console.log("Access token refreshed!");
                        return axios(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);

axios.defaults.withCredentials = true;
//functions to make api calls
const api = {
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    register: (body) => {
        return axios.post(`${baseUrl}/register`, body);
    },
    login: (body) => {
        return axios.post(`${baseUrl}/login`, body);
    },
    refreshToken: () => {
        return axios.post(`${baseUrl}/refresh-token`);
    },
    logout: () => {
        return axios.post(`${baseUrl}/logout`);
    }
}

export default api;