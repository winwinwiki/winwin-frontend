
const url = "https://demo8782246.mockable.io";
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