import CommonUtil from '../commonUtil';

export function fetchOrgSpiTags(orgId, progId, callback) {
    let url = CommonUtil.createUrl('/spi-tags');
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => callback(null, responseJson))
        .catch((error) => {
            callback(error, null);
        });
}