import CommonUtil from '../commonUtil';

export function callFilterOrgApi(filter, callback) {
    let url = CommonUtil.createUrl('/organisations');
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filter)
    })
        .then((response) => response.json())
        .then((responseJson) => callback(null, responseJson))
        .catch((error) => {
            callback(error, null);
        });
}