export const OrgFilters = {
  Priority: ["Normal", "High"],

  frameworkTagList:  [
    { value: "SPI", label: "Social Progress Index" },
    {
      value: "SDG",
      label: "Sustainable Developement Goals"
    }
  ],

  frameworkLabels:  {
    "Social Progress Index": {
      // level1: "Dimensions",
      // level2: "Components",
      level3: "Indicators"
    },
    "Sustainable Developement Goals": {
      // level1: "Goals",
      level2: "Sub-Goals"
    }
  },

  industryClassification:  [
    { value: "NAICS", label: "NAICS" },
    { value: "NTEE", label: "NTEE" }
  ],

  defaultFilters: {
    pageNo: 0,
    pageSize: 10,
    editedBy: [],
    createdBy: [],
    industryCls: "",
    subIndustryCls: "",
    frameworkTag: "",
    level1: "",
    level2: "",
    level3: "",
    sectorLevel: [],
    tagStatus: [],
    priority: "",
    revenue: { min: "", max: "" },
    assets: { min: "", max: "" },
    level1List: [],
    level2List: [],
    level3List: [],
    city: "",
    county: "",
    state: "",
    country: ""
  }
}