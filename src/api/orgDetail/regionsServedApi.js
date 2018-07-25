import CommonUtil from '../commonUtil';

export function callRegionsServedApi(regions, callback) {
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