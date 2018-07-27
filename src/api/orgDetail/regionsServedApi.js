import CommonUtil from '../commonUtil';

export function setRegionsServedApi(regions, callback) {
    let url = CommonUtil.createUrl('/regions-served');
    fetch(url,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regions)
    })
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
        callback(error, null);
    });
}

export function fetchRegionsServedApi(callback) {
    let url = CommonUtil.createUrl('/regions-served');
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
        callback(error, null);
    });
}