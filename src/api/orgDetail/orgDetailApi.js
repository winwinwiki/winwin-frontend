import CommonUtil from "../commonUtil";

export function callFetchOrgHierarchyApi(orgId, callback) {
  // callback(null, {
  //   "id": 2,
  //   "collapsed": false,
  //   "name": "Human Health Services",
  //   "location": "Washington, DC",
  //   "childrenType": "Division",
  //   "children": [
  //     {
  //       "id": 1,
  //       "name": "Administration for Children & Families",
  //       "location": "Washington, DC",
  //       "childrenType": "Department",
  //       "children": [{
  //         "id": 9,
  //         "name": "Administration for Children & Families",
  //         "location": "Washington, DC",
  //         "childrenType": "Department",
  //         "children": [{
  //           "id": 80,
  //           "name": "Administration of Community Living",
  //           "location": "Washington, DC",
  //           "childrenType": "Department"
  //         }]
  //       },
  //       {
  //         "id": 10,
  //         "name": "Administration of Community Living",
  //         "location": "Washington, DC",
  //         "childrenType": "Department"
  //       }]
  //     },
  //     {
  //       "id": 3,
  //       "name": "Administration of Community Living",
  //       "location": "Washington, DC",
  //       "childrenType": "Department"
  //     },
  //     {
  //       "id": 4,
  //       "name": "Agency for Healthcare Research and Quality",
  //       "location": "Washington, DC",
  //       "childrenType": "Department"
  //     },
  //     {
  //       "id": 5,
  //       "name": "Agency for Toxic Substances & Disease Registry",
  //       "location": "Washington, DC",
  //       "childrenType": "Department"
  //     },
  //     {
  //       "id": 6,
  //       "name": "Administration of Aging",
  //       "location": "Washington, DC",
  //       "childrenType": "Department"
  //     },
  //     {
  //       "id": 7,
  //       "name": "Agency for Toxic Substances & Disease Registry",
  //       "location": "Washington, DC",
  //       "childrenType": "Department"
  //     },
  //     {
  //       "id": 8,
  //       "name": "Administration of Aging",
  //       "location": "Washington, DC",
  //       "childrenType": "Department"
  //     }
  //   ]
  // });
  let url = CommonUtil.createUrl(`/organization/${orgId}/suborganization`);
  fetch(url)
    .then(response => response.json())
    .then(responseJson => callback(null, responseJson))
    .catch(error => {
      callback(error, null);
    });
}
