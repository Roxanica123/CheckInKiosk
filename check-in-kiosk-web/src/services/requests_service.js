import axios from "axios";

export class RequestsService {
    static BASE_URL = "http://localhost:8000";

    static async get(url) {
        return await axios.get(`${RequestsService.BASE_URL}${url}`)
    }

    static async getExternal(url){
        return await axios.get(url);
    }

    static async post(url, body) {
        console.log("Body", body);
        return await axios.post(`${RequestsService.BASE_URL}${url}`, body)
    }

}