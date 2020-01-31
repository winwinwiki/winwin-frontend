import { createSelector } from "reselect";
import createFilterOptions from "react-select-fast-filter-options";

const regionsList = state => state.regionsServed;

export const regionsListSelector = createSelector(
  [regionsList],
  details => {
    if (!details.regionsList) return null;

    let list =
      details.regionsList.response &&
      details.regionsList.response.map(x => {
        return {
          value: x.regionId,
          label: x.regionName
        };
      });
    return { regionsList: list, isLoading: details.loading };
  }
);

// Create a search index optimized to quickly filter options.
// The search index will need to be recreated if your options array changes.
// This index is powered by js-search: https://github.com/bvaughn/js-search
// Reselect will only re-run this if options has changed
export const getIndexedOptions = createSelector(
  regionsListSelector,
  options => createFilterOptions({ options })
);
