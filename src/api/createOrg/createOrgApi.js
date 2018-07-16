export function callCreateOrgApi(org, callback) {
    fetch('https://2f248b72-f468-4550-9f26-e85de48b7c33.mock.pstmn.io/users',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(org)
    })
  .then((response) => response.json())
  .then((responseJson) => callback(null, responseJson))
  .catch((error) => {
    callback(error, null);
  });
}