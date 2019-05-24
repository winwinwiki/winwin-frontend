import { createSelector } from "reselect";

const orgHierarchy = state => state.orgChart.orgHierarchy;

const OrgHierarchySelector = createSelector(
  [orgHierarchy],
  details => {
    if (!details) return null;
    const { response } = details;
    let uiModel = response && [response].map(rename);
    //parent node will be undraggable
    if (uiModel && uiModel.length) uiModel[0].noDragging = true;

    return uiModel ? uiModel : [];
  }
);

const rename = obj => {
  for (var prop in obj) {
    if (Array.isArray(obj[prop])) {
      obj[prop] = obj[prop].map(rename);
    }
    //rename name key
    if (prop === "name") {
      obj.title = obj[prop] || "";
      delete obj[prop];
    }
    //make subtitle from address obj
    if (prop === "location") {
      obj.subtitle =
        (obj[prop].city &&
          obj[prop].country &&
          `${obj[prop].city}, ${obj[prop].country}`) ||
        "";
      delete obj[prop];
    }
  }
  return obj;
};

export { OrgHierarchySelector };
