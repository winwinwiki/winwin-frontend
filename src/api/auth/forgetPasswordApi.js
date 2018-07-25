import CommonUtil from '../commonUtil';

export function callFpApi(email, callback) {
  let url = CommonUtil.createUrl('/users');
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email
    })
  })
    .then((response) => response.json())
    .then((responseJson) => callback(null, responseJson))
    .catch((error) => {
      callback(error, null);
    });
}