import CommonUtil from "../commonUtil";

export function callFetchOrgHistoryApi(orgId, callback) {
  let url = CommonUtil.createUrl(`/organization/${orgId}/history`);
  fetch(url, {
    headers: CommonUtil.getAuthId()
  })
    .then(response => response.json())
    .then(responseJson => callback(null, responseJson))
    .catch(error => {
      callback(error, null);
    });
}
