import CommonUtil from '../commonUtil';

export function callFetchOrgApi(callback) {
  let url = CommonUtil.createUrl('/organisations');
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
      callback(error, null);
    });
}