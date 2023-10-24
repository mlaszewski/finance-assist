import axios from "axios";
import authHeader from "./auth-header";

const API_URL = " http://localhost:8000/api/v1/transactions?page=0&size=2&orderWay=asc";

class UserService {
    getTransactions() {
        return axios.get(API_URL, { headers: authHeader() });
    }
}

export default new UserService();