import { createSelector } from "reselect";

const programsList = state => state.programList.programList;

const programListSelector = createSelector(
  [programsList],
  details => {
    if (!details) return null;
    return (
      details.response &&
      (details.response.length !== 0 ? details.response[0].organizationId : 0)
    );
  }
);

export { programListSelector };
