import CommonUtil from '../commonUtil';

export function callFetchUserApi(callback) {
    // let url = CommonUtil.createUrl('/user');
    let url = "http://winwinapi.ramprasadg.com/user/1";
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
            email:"",
            imageUrl:"",
            role: "Administrator",
            team: "",
            status:"Active",
            orgId: ""
        },
        {
            id: 2,
            name: "Ariya Macleod",
            email:"",
            imageUrl:"",
            role: "Data Seeder",
            team: "UCLA",
            status:"Active",
            orgId: ""
        },
        {
            id: 3,
            name: "Becky Redmond",
            email:"",
            imageUrl:"",
            role: "Data Seeder",
            team: "Cornell University",
            status:"Inactive",
            orgId: ""
        },
        {
            id: 4,
            name: "Jens Molbak",
            email:"",
            imageUrl:"",
            role: "Administrator",
            team: "",
            status:"Active",
            orgId: ""
        }
    ]);
}