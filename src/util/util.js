export function modifiyFilterList(list) {
    let desiredList = {};
    desiredList["assetsRangeMin"] = list["assetsRange"]["min"];
    desiredList["assetsRangeMax"] = list["assetsRange"]["max"];
    list["frameworkTag"] ? desiredList["frameworkTag"] = list["frameworkTag"]["value"] : '';
    list["industryCls"] ? desiredList["industryCls"] = list["industryCls"]["value"] : '';
    list["level1"] ? desiredList["level1"] = list["level1"]["value"] : '';
    list["level2"] ? desiredList["level2"] = list["level2"]["value"] : '';
    list["level3"] ? desiredList["level3"] = list["level3"]["value"] : '';
    list["priority"] ? desiredList["priority"] = list["priority"]: '';
    desiredList["revenueRangeMin"] = list["revenueRange"]["min"];
    desiredList["revenueRangeMax"] = list["revenueRange"]["max"];
    list["status"] && list["status"].length ? desiredList["status"] = list["status"]: '';
    list["sector"] && list["sector"].length ? desiredList["sector"] = list["sector"]: '';
    if (list["subIndustryCls"] && list["subIndustryCls"].length){
        desiredList["subIndustryCls"] = list["subIndustryCls"].map(subIndustryCls => subIndustryCls.value);
    }
    if (list["userMod"] && list["userMod"].length){
        desiredList["userMod"] = list["userMod"].map(userMod => userMod.value);
    }
    return desiredList;
}