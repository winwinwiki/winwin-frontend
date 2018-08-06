import CommonUtil from '../commonUtil';

export function callFetchUserApi(callback) {
    let url = CommonUtil.createUrl('/user');
        // fetch(url, {
        //     method: 'GET',
        //     headers: CommonUtil.getToken()
        // })
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => callback(null, responseJson))
        .catch((error) => callback(error, null));
}