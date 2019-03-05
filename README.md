WINWIN frontend App

![alt text](https://travis-ci.com/winwinwiki/winwin-frontend.svg?branch=dev "Travis-CI dev build status")

### Running the service

```
  npm install
  npm start
```
  
The service should be up on http://localhost:3000

### Building for deployment

```
  npm install
  npm run-script build
```
Copy all the files and folders from ..\winwin-frontend\build and drop in S3 bucket
