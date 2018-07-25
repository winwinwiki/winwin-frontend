
const url = "https://2f248b72-f468-4550-9f26-e85de48b7c33.mock.pstmn.io";
class CommonUtil {
    static createUrl(endPoints) {
        return url + endPoints;
    }

    static createAuthUrl(endPoints, accessToken) {
        return url + endPoints + accessToken;
    }

    static getHeaders() {
        return { 'Content-Type': 'application/x-www-form-urlencoded' };
    }

    static getToken() {
        let token = localStorage.getItem('_token') ? localStorage.getItem('_token') : null;
        return { Authorization: 'Bearer ' + token };
    }

}

export default CommonUtil;