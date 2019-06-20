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
        let detail = `${actionLabels[key]} ${entityLabels(
          x.entityType,
          x.parentEntityType
        )} ${
          x.entityName
            ? x.entityCode
              ? `${x.entityCode} ${x.entityName}`
              : x.entityName
            : ""
        } - ${x.parentEntityName}`;

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

const entityLabels = (label, parentLabel) => {
  switch (label) {
    case "spi tag":
      return `${titleCase(parentLabel)} Level Tag: SPI -`;
    case "sdg tag":
      return `${titleCase(parentLabel)} Level Tag: SDG -`;
    case "dataset":
      return `${titleCase(parentLabel)} Level Data Set:`;
    case "organization":
      return "Organization:";
    case "note":
      return "a Note -";
    case "resource":
      return `${titleCase(parentLabel)} Level Resource:`;
    case "region Served":
      return `${titleCase(parentLabel)} Level Region Served -`;
    default:
      return "";
  }
};

const actionLabels = {
  create: "Created",
  update: "Updated",
  delete: "Removed"
};

export { orgHistorySelector };
