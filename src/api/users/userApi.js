import CommonUtil from '../commonUtil';
import { resolve } from 'path';

export function callFetchUserApi() {
    let url = CommonUtil.createUrl('/user');
    // let url = "http://winwinapi.ramprasadg.com/user/1";
    return new Promise((resolve, reject) => {    
    // fetch(url, {
        //     method: 'GET',
        //     headers: CommonUtil.getToken()
        // })
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => resolve(responseJson))
        .catch((error) => reject(error));
    });
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