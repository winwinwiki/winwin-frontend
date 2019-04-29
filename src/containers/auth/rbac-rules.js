const rules = {
  Reader: {
    static: ["organizations:list"]
  },
  DataSeeder: {
    static: [
      //orglist page
      "organizations:list",
      "organizations:create",
      "organizations:multiCreate",
      "organizations:edit",
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
      //sdgtags
      "organizationDetailsSDGTags:list",
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
      //prog sdgtags
      "programDetailsSDGTags:list",
      //orgEdit history
      "organizationHistory:list",
      //notes
      "organizationNotes:list",
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
      //sdgtags
      "organizationDetailsSDGTags:list",
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
      //prog sdgtags
      "programDetailsSDGTags:list",
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
      "organizationNotes:list"
    ]
  }
};

export default rules;
