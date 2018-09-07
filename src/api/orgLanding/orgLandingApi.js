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