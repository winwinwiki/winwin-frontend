import CommonUtil from '../commonUtil';

export function setResourcesApi(regions, callback) {
    let url = CommonUtil.createUrl('/resources');
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

export function fetchResourcesApi(callback) {
    let url = CommonUtil.createUrl('/resources');
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
        callback(error, null);
    });
}