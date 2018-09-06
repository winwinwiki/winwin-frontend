import CommonUtil from '../commonUtil';

export function callLoginApi(email, password, callback) {
  let url = CommonUtil.createUrl('/users');
  return new Promise((resolve, reject) =>{
    fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then((response) => response.json())
    .then((responseJson) => resolve(responseJson))
    .catch((error) => {
      reject(error);//callback(error, null);
    })
  });
}