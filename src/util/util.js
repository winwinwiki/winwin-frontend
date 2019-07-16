import moment from "moment";
import {
  frameworkTagList,
  industryClassification
} from "../containers/orgLanding/appliedOrgFilters/appliedOrgFiltersList";

export function modifiyFilterList(list) {
  let desiredList = {};

  if (!(list["assets"]["min"] === 0 && list["assets"]["max"] === 0)) {
    desiredList["assetsMin"] = list["assets"]["min"];
    desiredList["assetsMax"] = list["assets"]["max"];
  }

  if (list["frameworkTag"])
    desiredList["frameworkTag"] = list["frameworkTag"]["value"];

  // if (list["industryCls"])
  //   desiredList["industryCls"] = list["industryCls"]["value"];

  if (list["frameworkTag"]["value"] === frameworkTagList[0]["value"]) {
    if (list["level1"]) desiredList["dimensionId"] = list["level1"]["value"];
    if (list["level2"]) desiredList["componentId"] = list["level2"]["value"];
    if (list["level3"]) desiredList["indicatorId"] = list["level3"]["value"];
  } else if (list["frameworkTag"]["value"] === frameworkTagList[1]["value"]) {
    if (list["level1"]) desiredList["goalCode"] = list["level1"]["value"];
    if (list["level2"]) desiredList["shortNameCode"] = list["level2"]["value"];
  }

  if (list["priority"]) desiredList["priority"] = list["priority"];

  if (!(list["revenue"]["min"] === 0 && list["revenue"]["max"] === 0)) {
    desiredList["revenueMin"] = list["revenue"]["min"];
    desiredList["revenueMax"] = list["revenue"]["max"];
  }

  if (list["tagStatus"] && list["tagStatus"].length)
    desiredList["tagStatus"] = list["tagStatus"];

  if (list["sectorLevel"] && list["sectorLevel"].length)
    desiredList["sectorLevel"] = list["sectorLevel"];

  if (list["industryCls"] && list["subIndustryCls"]) {
    if (list["industryCls"]["label"] === industryClassification[0].label)
      desiredList["naicsCode"] = list["subIndustryCls"].value;

    if (list["industryCls"]["label"] === industryClassification[1].label)
      desiredList["nteeCode"] = list["subIndustryCls"].value;
  }

  if (list["editedBy"] && list["editedBy"].length) {
    desiredList["editedBy"] = list["editedBy"].map(editedBy => editedBy.value);
  }

  if (
    list["pageNo"] ||
    list["pageSize"] ||
    list["created_by"] ||
    list["updated_by"]
  ) {
    desiredList["pageNo"] = list["pageNo"];
    desiredList["pageSize"] = list["pageSize"];
    desiredList["created_by"] = list["created_by"];
    desiredList["updated_by"] = list["updated_by"];
  }

  return desiredList;
}

//Updating JavaScript object-attributes from another object
export function updateObject(obj /*, …*/) {
  for (var i = 1; i < arguments.length; i++) {
    for (var prop in arguments[i]) {
      var val = arguments[i][prop];
      if (typeof val == "object")
        // this also applies to arrays or null!
        updateObject(obj[prop], val);
      else obj[prop] = val;
    }
  }
  return obj;
}

//check if string a contains string b in it
export const compareStrings = (a, b) => {
  //contains is not supported in Chrome, but you could use a polyfill
  if (!String.prototype.contains) {
    String.prototype.contains = function(s) {
      return this.indexOf(s) > -1;
    };
  }
  return (
    a != null &&
    b != null &&
    a
      .toString()
      .toLowerCase()
      .replace(/\s/g, "")
      .contains(
        b
          .toString()
          .toLowerCase()
          .replace(/\s/g, "")
      )
  );
};

export function titleCase(str) {
  return str
    .split(" ")
    .map(val => {
      return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
    })
    .join(" ");
}

export function timeSince(timestamp) {
  return moment(timestamp).fromNow();
}

export function customNumberFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export function getSPIDataByIndicators(SPIList, id) {
  let spi = {};
  if (!SPIList) return {};
  SPIList.forEach(({ dimensionId, dimensionName, components }) => {
    components.forEach(({ indicators, componentId, componentName }) => {
      let validIndicator = indicators.find(
        ({ indicatorId }) => indicatorId === id
      );
      if (validIndicator) {
        spi = {
          dimensionId,
          dimensionName,
          componentId,
          componentName,
          isChecked: true,
          ...validIndicator
        };
        return;
      }
    });
  });
  return spi;
}

export function getSDGDataBySubGoals(SDGList, id) {
  let sdg = {};
  SDGList.forEach(({ goalCode, goalName, subGoals }) => {
    let validGoal = subGoals.find(({ subGoalCode }) => subGoalCode === id);
    if (validGoal) {
      sdg = {
        goalCode,
        goalName,
        isChecked: true,
        ...validGoal
      };
      return;
    }
  });
  return sdg;
}

export function deepFilter(array, indicator) {
  return array.filter(function iter(o) {
    return Object.keys(o).some(function(k) {
      if (
        typeof o[k] === "string" &&
        o[k].toLowerCase().indexOf(indicator.toLowerCase()) !== -1
      ) {
        return true;
      }
      if (Array.isArray(o[k])) {
        o[k] = o[k].filter(iter);
        return o[k].length;
      }
    });
  });
}

export function orderByDate(arr, dateProp) {
  return arr.slice().sort(function(a, b) {
    return a[dateProp] > b[dateProp] ? -1 : 1;
  });
}

export const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return "0 Bytes";
  var k = 1024,
    dm = decimals <= 0 ? 0 : decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const mapOptionsToRegions = regionsList => {
  return regionsList.map(x => ({
    label: x.regionName,
    value: x.regionId
  }));
};

//remove node by id from deeply nested array of objects
export const removeFromTree = (root, idToDelete, parent, idx) => {
  if (root.id === idToDelete) {
    if (parent) {
      parent.children.splice(idx, 1);
    } else return null;
  }

  for (const [i, e] of root.children.entries()) {
    removeFromTree(e, idToDelete, root, i);
  }

  return root;
};

//find child node by id
export function findObjectById(root, id) {
  if (root.children) {
    for (var k in root.children) {
      if (root.children[k].id == id) {
        return root.children[k];
      } else if (root.children.length) {
        return findObjectById(root.children[k], id);
      }
    }
  }
}
