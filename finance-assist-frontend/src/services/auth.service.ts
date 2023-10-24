import axios from "axios";

const API_URL = " http://localhost:8000/api/v1/users/";

class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            })
            .then(response => {
                const {data} = response.data;
                if(data.token) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("accessToken", JSON.stringify(data.token))
                }

                return data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email: string, userName: string, password: string) {
        return axios
            .post(API_URL + "register", {
                email,
                userName,
                password
            });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if(userStr) return JSON.parse(userStr);

        return null
    }
}

export default new AuthService();