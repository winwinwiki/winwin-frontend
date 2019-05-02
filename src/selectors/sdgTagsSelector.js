import { createSelector } from "reselect";

const sdgTagsList = state => state.orgList.sdgList;

const sdgTagsListSelector = createSelector(
  [sdgTagsList],
  details => {
    if (!details) return null;
    const { response } = details;
    let uiModel = response.flatMap(x => x.subGoals);
    return [...uiModel];
  }
);

export { sdgTagsListSelector };
