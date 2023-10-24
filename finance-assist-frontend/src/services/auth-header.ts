export default function authHeader() {
    const tokenStr = localStorage.getItem("accessToken");
    let token = null;
    if (tokenStr)
        token = JSON.parse(tokenStr);

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return { Authorization: '' };
    }
}