
const url = "https://demo8782246.mockable.io";
const url1 = "https://demo4705881.mockable.io";
class CommonUtil {
    static createUrl(endPoints) {
        return endPoints == '/program1' || endPoints == '/data-sets' ? (url1 + endPoints):(url + endPoints);
    }

    static createAuthUrl(endPoints, accessToken) {
        return url + endPoints + accessToken;
    }

    static getHeaders() {
        return { 'Content-Type': 'application/x-www-form-urlencoded' };
    }

    static getToken() {
        let token = localStorage.getItem('_token') ? localStorage.getItem('_token') : null;
        return { Authorization: 'Bearer ' + token, 'Content-Type': 'application/x-www-form-urlencoded' };
    }

}

export default CommonUtil;