import axios from "axios";
import Page500 from "../components/Page500/Page500";
const baseUrl = "http://localhost:3001";
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
        return axios.post(`${baseUrl}/auth/register`, body);
    },
    login: (body) => {
        return axios.post(`${baseUrl}/auth/login`, body);
    },
    refreshToken: () => {
        return axios.post(`${baseUrl}/auth/refresh-token`);
    },
    logout: () => {
        return axios.post(`${baseUrl}/auth/logout`);
    },
    createRoom: (data) => {
        return axios.post(`${baseUrl}/room`, data);
    },
    searchListRoom: (page, key) => {
        return axios.get(`${baseUrl}/room/search?key=${key}&page=${page}&perpage=8`);
    },
    getlistroom: (page) => {
        return axios.get(`${baseUrl}/room?page=${page}&perpage=8`);
    },
    updateRoom: (id, data) => {
        return axios.put(`${baseUrl}/room/${id}`, data);
    },
    getRoom: (id) => {
        return axios.get(`${baseUrl}/room/${id}`);
    },
    deleteRoom: (id) => {
        return axios.delete(`${baseUrl}/room/${id}`)
    },
    createGuest: (data) => {
        return axios.post(`${baseUrl}/guest`, data);
    },
    getlistguest: (page) => {
        return axios.get(`${baseUrl}/guest?page=${page}&perpage=8`);
    },
    getGuest: (id) => {
        return axios.get(`${baseUrl}/guest/${id}`);
    },
    updateGuest: (id, data) => {
        return axios.put(`${baseUrl}/guest/${id}`, data);
    },
    deleteGuest: (id) => {
        return axios.delete(`${baseUrl}/guest/${id}`)
    },
    searchListGuest: (page, key) => {
        return axios.get(`${baseUrl}/guest/search?key=${key}&page=${page}&perpage=8`);
    },
    getliststaff: (page) => {
        return axios.get(`${baseUrl}/staff?page=${page}&perpage=8`);
    },
    searchliststaff: (page, key) => {
        return axios.get(`${baseUrl}/staff/search?key=${key}&page=${page}&perpage=8`);
    },
    searchStaffName: (page, key) => {
        return axios.get(`${baseUrl}/staff/searchname?key=${key}&page=${page}&perpage=8`);
    },
    createStaff: (data) => {
        return axios.post(`${baseUrl}/staff`, data);
    },
    getStaff: (id) => {
        return axios.get(`${baseUrl}/staff/${id}`);
    },
    updateStaff: (id, data) => {
        return axios.put(`${baseUrl}/staff/${id}`, data);
    },
    deleteStaff: (id) => {
        return axios.delete(`${baseUrl}/staff/${id}`)
    },
    searchRoomName: (page, key) => {
        return axios.get(`${baseUrl}/room/searchname?key=${key}&page=${page}&perpage=8`);
    },
    getIdleRoomByType: (type, checkintime, checkouttime) => {
        return axios.get(`${baseUrl}/room/getidleroombytype?type=${type}&checkintime=${checkintime}&checkouttime=${checkouttime}`);
    },
    searchGuestByPhoneNumber: (key) => {
        return axios.get(`${baseUrl}/guest/searchbyphone?key=${key}&page=1`);
    },
    searchGuestName: (page, key) => {
        return axios.get(`${baseUrl}/guest/searchname?key=${key}&page=${page}&perpage=8`);
    },
    quickbooking: (data) => {
        return axios.post(`${baseUrl}/order`, data)
    },
    getOrderArrivalToday: (page) => {
        return axios.get(`${baseUrl}/order/arrival/day?page=${page}&perpage=8`)
    },
    getOrderArrivalTomorrow: (page) => {
        return axios.get(`${baseUrl}/order/arrival/tomorrow?page=${page}&perpage=8`)
    },
    getOrderArrivalThisWeek: (page) => {
        return axios.get(`${baseUrl}/order/arrival/week?page=${page}&perpage=8`)
    },
    getOrder: (id) => {
        return axios.get(`${baseUrl}/order/arrival/${id}`)
    },
    checkin: (id) => {
        return axios.get(`${baseUrl}/order/checkin/${id}`)
    },
    getOrderDepartureToday: (page) => {
        return axios.get(`${baseUrl}/order/departure/day?page=${page}&perpage=8`)
    },
    getOrderDepartureTomorrow: (page) => {
        return axios.get(`${baseUrl}/order/departure/tomorrow?page=${page}&perpage=8`)
    },
    getOrderDepartureThisWeek: (page) => {
        return axios.get(`${baseUrl}/order/departure/week?page=${page}&perpage=8`)
    },
    checkout: (id) => {
        return axios.get(`${baseUrl}/order/checkout/${id}`)
    },
    getOrderInHouse: (page) => {
        return axios.get(`${baseUrl}/order/inhouse?page=${page}&perpage=8`)
    }
}

export default api;