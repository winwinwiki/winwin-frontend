export function callFetchOrgHistoryApi(orgId, callback) {
  //   let url = programId? CommonUtil.createUrl('/'+programId) :CommonUtil.createUrl('/organisations/'+orgId);
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((responseJson) => callback(null, responseJson))
  //     .catch((error) => {
  //       callback(error, null);
  //     });
  callback(null, {
    name: "Beverly Art Center",
    history: [
      {
        id: 1,
        updatedBy: "Jens Molbak",
        updatedTime: "9 month ago",
        data: [
          "Added Organization Level Tag : SPI - Opportunity - Tolerance & Inclusion -Community Saftey Net",
          "Status changed from Unmapped to Organization Tag"
        ]
      },
      {
        id: 2,
        updatedBy: "Jens Molbak",
        updatedTime: "10 days ago",
        data: ["Added Program : Exhibition, Collections and Events"]
      }
    ]
  });
}
