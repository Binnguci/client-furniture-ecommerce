import axios, {AxiosInstance} from "axios";
import {store} from "../store/store.ts";

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:8085/api/",
            timeout: 10000,
        });
        this.instance.interceptors.request.use(
            (config) => {
                const state = store.getState();
                const accessToken = state.auth.accessToken;
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