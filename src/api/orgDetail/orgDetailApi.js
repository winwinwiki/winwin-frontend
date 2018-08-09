import CommonUtil from '../commonUtil';

export function callFetchOrgDetailApi(orgId, programId, callback) {
  let url = programId? CommonUtil.createUrl('/'+programId) :CommonUtil.createUrl('/organisations/'+orgId);
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
      callback(error, null);
    });
}