import { createSelector } from "reselect";
import { timeSince, titleCase, orderByDate } from "../util/util";

const orgHistory = state => state.orgHistory.orgHistory;

const orgHistorySelector = createSelector(
  [orgHistory],
  details => {
    if (!details) return null;
    let filteredHistory = [];
    //group by action performed (removed any whitespaces in entityType )
    let customHist = details.reduce((acc, curr) => {
      if (!acc[curr.actionPerformed]) acc[curr.actionPerformed] = [];
      acc[curr.actionPerformed].push(curr);
      return acc;
    }, {});
    //create title and details to be shown in history
    Object.entries(customHist).forEach(([key, value]) => {
      value.map(x => {
        let customModAt = timeSince(x.modifiedAt);

        let found = filteredHistory.some(el => el.modifiedAt === customModAt);

        //sentence construction  - detail property
        let detail = `${actionLabels[key]} ${entityLabels[x.entityType]} ${
          x.entityName
            ? x.entityCode
              ? `${x.entityCode} ${x.entityName}`
              : x.entityName
            : ""
        }`;

        //create a new record when modifiedAt is not found
        if (!found) {
          filteredHistory.push({
            title: `${titleCase(key)} by '${titleCase(
              x.modifiedBy
            )}' ${customModAt}'`,
            modifiedAt: customModAt,
            timestamp: x.modifiedAt,
            details: [detail]
          });
        } else {
          //if modifiedAt time is already present add to details array of the present object
          filteredHistory.map(y => {
            if (y.modifiedAt === customModAt) y.details.push(detail);
            return y;
          });
        }
      });
    });

    //sort the list by timestamp
    return [...orderByDate(filteredHistory, "timestamp")];
  }
);

const actionLabels = {
  create: "Created",
  update: "Updated",
  delete: "Removed"
};

const entityLabels = {
  "spi tag": "Organization Level Tag: SPI -",
  "sdg tag": "Organization Level Tag: SDG -",
  dataset: "Data Set:",
  organization: "Organization:",
  note: "a Note -",
  resource: "Resource:",
  "region Served": "Region Served -"
};

export { orgHistorySelector };
