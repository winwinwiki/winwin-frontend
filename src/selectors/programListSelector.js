import { createSelector } from "reselect";

const programsList = state => state.programList.programList;

const programListSelector = createSelector(
  [programsList],
  details => {
    if (!details) return null;
    return details.response && details.response[0].organizationId;
  }
);

export { programListSelector };
