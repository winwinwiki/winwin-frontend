import CommonUtil from '../commonUtil';

export function setDataSetApi(regions, callback) {
    let url = CommonUtil.createUrl('/data-sets');
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

export function fetchDataSetApi(callback) {
    let url = CommonUtil.createUrl('/data-sets');
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
        callback(error, null);
    });
}