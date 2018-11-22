import CommonUtil from '../commonUtil';
import HandleError from '../handleError';
import qs from 'query-string';

export function callFetchOrgApi(params, callback) {
  let url = CommonUtil.createUrl('/organisations');
  let queryString = qs.stringify(params);
  fetch(`${url}${queryString ? "?"+queryString: ''}`)
    .then((response) => response.json())
    .then((responseJson) => HandleError.checkResponse(responseJson, callback))
    .catch((error) => {
      callback(error, null);
    });
}

export function callFetchSdgListApi(callback){
  let url = CommonUtil.createUrl('/sdgList');
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => HandleError.checkResponse(responseJson, callback))
    .catch((error) => {
      callback(error, null);
    });
}

export function callFetchSpiListApi(callback){
  let url = CommonUtil.createUrl('/spiList');
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => HandleError.checkResponse(responseJson, callback))
    .catch((error) => {
      callback(error, null);
    });
}