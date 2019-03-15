export function modifiyFilterList(list) {
  let desiredList = {};
  desiredList["assetsRangeMin"] = list["assetsRange"]["min"];
  desiredList["assetsRangeMax"] = list["assetsRange"]["max"];
  if (list["frameworkTag"])
    desiredList["frameworkTag"] = list["frameworkTag"]["value"];
  if (list["industryCls"])
    desiredList["industryCls"] = list["industryCls"]["value"];
  if (list["level1"]) desiredList["level1"] = list["level1"]["value"];
  if (list["level2"]) desiredList["level2"] = list["level2"]["value"];
  if (list["level3"]) desiredList["level3"] = list["level3"]["value"];
  if (list["priority"]) desiredList["priority"] = list["priority"];
  desiredList["revenueRangeMin"] = list["revenueRange"]["min"];
  desiredList["revenueRangeMax"] = list["revenueRange"]["max"];
  if (list["status"] && list["status"].length)
    desiredList["status"] = list["status"];
  if (list["sector"] && list["sector"].length)
    desiredList["sector"] = list["sector"];
  if (list["subIndustryCls"] && list["subIndustryCls"].length) {
    desiredList["subIndustryCls"] = list["subIndustryCls"].map(
      subIndustryCls => subIndustryCls.value
    );
  }
  if (list["userMod"] && list["userMod"].length) {
    desiredList["userMod"] = list["userMod"].map(userMod => userMod.value);
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
