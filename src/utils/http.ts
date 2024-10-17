import axios, {AxiosInstance} from "axios";

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:8086/api/",
            timeout: 10000,
        })
    }
}

const http = new Http().instance
export default http