import CommonUtil from '../commonUtil';
import HandleError from '../handleError';

export function callFetchOrgApi(callback) {
  let url = CommonUtil.createUrl('/organisations');
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => HandleError.checkResponse(responseJson, callback))
    .catch((error) => {
      callback(error, null);
    });
}