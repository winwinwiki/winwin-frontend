import CommonUtil from "../commonUtil";
export function fetchNotesApi(callback, orgId) {
  let url = CommonUtil.createUrl(`/organization/${orgId}/notes`);
  fetch(url, {
    headers: CommonUtil.getAuthId()
  })
    .then(response => response.json())
    .then(responseJson => callback(null, responseJson))
    .catch(error => {
      callback(error, null);
    });
}
