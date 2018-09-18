import CommonUtil from '../commonUtil';
export function fetchNotesApi(callback) {
    let url = CommonUtil.createUrl('/notes');
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
        callback(error, null);
    });
}