import { createSelector } from "reselect";

const spiTagsList = state => state.orgList.spiList;

const spiTagsListSelector = createSelector(
  [spiTagsList],
  details => {
    if (!details) return null;
    const { response } = details;
    let uiModel = response.flatMap(({ components }) =>
      components.flatMap(({ indicators }) => indicators)
    );
    return [...uiModel];
  }
);

export { spiTagsListSelector };
