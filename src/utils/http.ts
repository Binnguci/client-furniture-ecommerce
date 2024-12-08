import axios, {AxiosInstance} from "axios";

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:8085/api/",
            timeout: 10000,
        });
        this.instance.interceptors.request.use(
            (config) => {
                const accessToken = localStorage.getItem("accessToken");

                if (accessToken) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
}

const http = new Http().instance
export default http