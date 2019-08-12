const rules = {
  Reader: {
    static: [
      "organizations:list",
      "organizationDetails:list",
      "organizationDetailsDataSet:list",
      "organizationHistory:list",
      "organizationNotes:list",
      "programs:list",
      "programDetails:list",
      "programDetailsDataSet:list",
      "programDetailsRegionsServed:list",
      "programDetailsResources:list",
      "programDetailsSPITags:list",
      "programDetailsSDGTags:list",
      "organizationDetailsRegionsServed:list",
      "organizationDetailsResources:list",
      "organizationDetailsSPITags:list",
      "organizationDetailsSDGTags:list",
      "organizationsChart:list",
      "users:changePassword"
    ]
  },
  DataSeeder: {
    static: [
      //orglist page
      "organizations:list",
      "organizations:create",
      "organizations:edit",
      "organizations:delete",
      //naics ntee
      "naics:list",
      "naics:list",
      //orgdetails
      "organizationDetails:list",
      //org chart
      "organizationsChart:list",
      "organizationsChart:get",
      "organizationsChart:viewDetails",
      "organizationsChart:create",
      //org datasets
      "organizationDetailsDataSet:list",
      "organizationDetailsDataSet:create",
      "organizationDetailsDataSet:edit",
      "organizationDetailsDataSet:delete",
      //org resources
      "organizationDetailsResources:list",
      "organizationDetailsResources:create",
      "organizationDetailsResources:edit",
      "organizationDetailsResources:delete",
      //org regions-served
      "organizationDetailsRegionsServed:list",
      "organizationDetailsRegionsServed:create",
      "organizationDetailsRegionsServed:edit",
      "organizationDetailsRegionsServed:delete",
      //spitags
      "organizationDetailsSPITags:list",
      "organizationDetailsSPITags:edit",
      //sdgtags
      "organizationDetailsSDGTags:list",
      "organizationDetailsSDGTags:edit",
      //programs
      "programs:list",
      "programs:create",
      //program details
      "programDetails:list",
      //prog datasets
      "programDetailsDataSet:list",
      "programDetailsDataSet:create",
      "programDetailsDataSet:edit",
      "programDetailsDataSet:delete",
      //prog resources
      "programDetailsResources:list",
      "programDetailsResources:create",
      "programDetailsResources:edit",
      "programDetailsResources:delete",
      //prog regions-served
      "programDetailsRegionsServed:list",
      "programDetailsRegionsServed:create",
      "programDetailsRegionsServed:edit",
      "programDetailsRegionsServed:delete",
      // prog spitags
      "programDetailsSPITags:list",
      "programDetailsSPITags:edit",
      //prog sdgtags
      "programDetailsSDGTags:list",
      "programDetailsSDGTags:edit",
      //orgEdit history
      "organizationHistory:list",
      //notes
      "organizationNotes:list",
      "organizationNotes:create",
      "organizationNotes:delete"
      //user profile
      "users:getSelf",
      //user actions
      "users:changePassword"
    ]
  },
  writer: {
    static: [
      "organizations:list",
      "organizations:create",
      "users:getSelf",
      "home-page:visit",
      "dashboard-page:visit"
    ],
    dynamic: {
      "organizations:edit": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      }
    }
  },
  Administrator: {
    static: [
      //orglist page
      "organizations:list",
      "organizations:create",
      "organizations:multiCreate",
      "organizations:edit",
      "organizations:delete",
      //orgdetails
      "organizationDetails:list",
      "organizationDetails:edit",
      //naics ntee
      "naics:list",
      "naics:list",
      //org chart
      "organizationsChart:list",
      "organizationsChart:get",
      "organizationsChart:viewDetails",
      "organizationsChart:create",
      //org datasets
      "organizationDetailsDataSet:list",
      "organizationDetailsDataSet:create",
      "organizationDetailsDataSet:edit",
      "organizationDetailsDataSet:delete",
      //org resources
      "organizationDetailsResources:list",
      "organizationDetailsResources:create",
      "organizationDetailsResources:edit",
      "organizationDetailsResources:delete",
      //org regions-served
      "organizationDetailsRegionsServed:list",
      "organizationDetailsRegionsServed:create",
      "organizationDetailsRegionsServed:edit",
      "organizationDetailsRegionsServed:delete",
      //spitags
      "organizationDetailsSPITags:list",
      "organizationDetailsSPITags:edit",
      //sdgtags
      "organizationDetailsSDGTags:list",
      "organizationDetailsSDGTags:edit",
      //programs
      "programs:list",
      "programs:create",
      //program details
      "programDetails:list",
      //prog datasets
      "programDetailsDataSet:list",
      "programDetailsDataSet:create",
      "programDetailsDataSet:edit",
      "programDetailsDataSet:delete",
      //prog resources
      "programDetailsResources:list",
      "programDetailsResources:create",
      "programDetailsResources:edit",
      "programDetailsResources:delete",
      //prog regions-served
      "programDetailsRegionsServed:list",
      "programDetailsRegionsServed:create",
      "programDetailsRegionsServed:edit",
      "programDetailsRegionsServed:delete",
      // prog spitags
      "programDetailsSPITags:list",
      "programDetailsSPITags:edit",
      //prog sdgtags
      "programDetailsSDGTags:list",
      "programDetailsSDGTags:edit",
      //usermanagement
      "users:list",
      "users:create",
      "users:edit",
      "users:delete",
      "users:getSelf",
      "users:changePassword",
      //orgEdit history
      "organizationHistory:list",
      //notes
      "organizationNotes:list",
      "organizationNotes:create",
      "organizationNotes:delete"
    ]
  }
};

export default rules;
