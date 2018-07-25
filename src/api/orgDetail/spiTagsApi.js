export function fetchOrgSpiTags(orgId, progId,callback) {
    fetch('https://2f248b72-f468-4550-9f26-e85de48b7c33.mock.pstmn.io/spi-tags')
  .then((response) => response.json())
  .then((responseJson) => callback(null, responseJson))
  .catch((error) => {
    callback(error, null);
  });
}