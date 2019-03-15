import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const filename = file.name;
  window.LOG_LEVEL = "DEBUG";
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });
  const image = await Storage.vault.get(stored.key);
  return image;
}

// The above method does a couple of things.

// 1. It takes a file object as a parameter.

// 2. Generates a unique file name using the current timestamp (Date.now()). Of course, if your app is being used heavily this might not be the best way to create a unique filename. But this should be fine for now.

// 3. Upload the file to the user’s folder in S3 using the Storage.vault.put() object. Alternatively, if we were uploading publicly you can use the Storage.put() method.

// And return the stored object in this case image.
