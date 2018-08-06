import CommonUtil from '../commonUtil';

export function callFetchOrgDetailApi(orgID, callback) {
  let url = CommonUtil.createUrl('/organisations/'+orgID);
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
      callback(error, null);
    });
}