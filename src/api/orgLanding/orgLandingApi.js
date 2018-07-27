import CommonUtil from '../commonUtil';
import HandleError from '../handleError';

export function callFetchOrgApi(callback) {
  let url = CommonUtil.createUrl('/organisations');
  fetch(url)
    .then((response) => HandleError.checkResponse(response.json(), callback))
    .catch((error) => {
      callback(error, null);
    });
}