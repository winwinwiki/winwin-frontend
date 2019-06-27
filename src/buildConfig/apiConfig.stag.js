export const apiConfig = {
  protocol: "http",
  host: "ec2-34-222-155-54.us-west-2.compute.amazonaws.com",
  bulkUploadTemplateUrl:
    "https://s3.amazonaws.com/winwin-public-bucket-dev/admin_bulk_create_template.csv",
  s3: {
    REGION: "us-east-2",
    BUCKET: "winwin-frontend-bucket"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "http://winwin-frontend-bucket.s3-website.us-east-2.amazonaws.com"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_KvsqdCvky",
    APP_CLIENT_ID: "43qua09iodvdmk19uit16su489"
    //IDENTITY_POOL_ID: "us-east-1:365ca2f4-ec1e-48f7-8ef7-beaf41db2dd6"
  }
};
