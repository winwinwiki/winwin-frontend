import { createSelector, createStructuredSelector } from "reselect";

const naicsList = state => state.naicsList;
const nteeList = state => state.nteeList;

const naicsListSelector = createSelector(
  [naicsList],
  details => {
    if (!details) return [];
    let uiModel =
      details.data &&
      details.data.map(x => {
        return {
          id: x.id,
          name: x.name
        };
      });
    return uiModel;
  }
);

const nteeListSelector = createSelector(
  [nteeList],
  details => {
    if (!details) return [];
    let uiModel =
      details.data &&
      details.data.map(x => {
        return {
          id: x.id,
          name: x.name
        };
      });
    return uiModel;
  }
);

const industryClassificationSelector = createStructuredSelector({
  naicsList: naicsListSelector,
  nteeList: nteeListSelector
});

export { industryClassificationSelector };
