import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:80/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});