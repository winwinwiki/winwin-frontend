export const apiConfig = {
  protocol: "http",
  host: "ec2-54-209-46-206.compute-1.amazonaws.com",
<<<<<<< HEAD
  // host: "172.19.20.47:8088",
=======
  bulkUploadTemplateUrl:
    "https://s3.amazonaws.com/winwin-public-bucket-dev/Upload_bulk_org_template.csv",
>>>>>>> dev
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
