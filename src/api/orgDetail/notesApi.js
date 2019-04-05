import CommonUtil from "../commonUtil";
export function fetchNotesApi(callback, orgId) {
  let url = CommonUtil.createUrl(`/organization/${orgId}/notes`);
  fetch(url)
    .then(response => response.json())
    .then(responseJson => callback(null, responseJson))
    .catch(error => {
      callback(error, null);
    });
}
