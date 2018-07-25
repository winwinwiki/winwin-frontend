import CommonUtil from '../commonUtil';

export function fetchOrgSdgTags(orgId, progId, callback) {
  let url = CommonUtil.createUrl('/sdg-tags');
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
      callback(error, null);
    });
}