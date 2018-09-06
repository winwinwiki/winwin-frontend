import CommonUtil from '../commonUtil';

export function callFetchUserApi(callback) {
    let url = CommonUtil.createUrl('/user');
        // fetch(url, {
        //     method: 'GET',
        //     headers: CommonUtil.getToken()
        // })
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => callback(null, responseJson))
        .catch((error) => callback(error, null));
}

export function callFetchUserListApi(callback) {
    // let url = CommonUtil.createUrl('/users');
    //     // fetch(url, {
    //     //     method: 'GET',
    //     //     headers: CommonUtil.getToken()
    //     // })
    //     fetch(url)
    //     .then((response) => response.json())
    //     .then((responseJson) => callback(null, responseJson))
    //     .catch((error) => callback(error, null));

    callback(null, [
        {
            id: 1,
            name: "Allison Zimmermann",
            role: "Administrator",
            team: ""
        },
        {
            id: 2,
            name: "Ariya Macleod",
            role: "Data Seeder",
            team: "UCLA"
        },
        {
            id: 3,
            name: "Becky Redmond",
            role: "Data Seeder",
            team: "Cornell University"
        },
        {
            id: 4,
            name: "Jens Molbak",
            role: "Administrator",
            team: ""
        }
    ]);
}