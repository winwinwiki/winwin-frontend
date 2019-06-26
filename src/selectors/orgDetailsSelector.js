import { createSelector } from "reselect";

const orgDetails = state => state.orgDetail;

const orgDetailsSelector = createSelector(
  [orgDetails],
  details => {
    if (!details) return null;
    const { data: { response } = {} } = details;
    if (response.naicsCode)
      response.naicsCode.name = `${response.naicsCode.code} - ${
        response.naicsCode.name
      }`;

    if (response.nteeCode)
      response.nteeCode.name = `${response.nteeCode.code} - ${
        response.nteeCode.name
      }`;

    return details;
  }
);

export { orgDetailsSelector };
