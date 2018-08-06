import CommonUtil from '../commonUtil';

export function callFetchProgramApi(orgId, callback) {
  let url = CommonUtil.createUrl('/programs');
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
      callback(error, null);
    });
}