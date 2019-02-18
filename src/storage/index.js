var AWS = require('ibm-cos-sdk');
var store;

exports.connectToStorage = () => {
  return new Promise((resolve, reject) => {
    store = new AWS.S3({
      endpoint: process.env.STORE_ENDPOINT,
      apiKeyId: process.env.STORE_APIKEY,
      ibmAuthEndpoint: process.env.STORE_AUTHENDPOINT,
      serviceInstanceId: process.env.STORE_INSTANCE,
    });
    resolve();
  });
}

exports.uploadFile = (bucketName, itemName, fileData) => {
  return new Promise((resolve, reject) => {
    store.upload({ Bucket: bucketName, Key: itemName, Body: fileData }, { partSize: 5242880, queueSize: 1 }).promise()
      .then(() => resolve())
      .catch(error => reject({ code: 500, msg: error.message }));
  });
}


exports.downloadFile = (bucketName, imageName) => {
  return new Promise((resolve, reject) => {
    store.getObject({ Bucket: bucketName, Key: imageName }).promise()
      .then((data) => { if (data != null) resolve(data.Body); else reject({ code: 500, msg: "File not found" }); })
      .catch((error) => reject({ code: 500, msg: error.message }));
  });
}

exports.deleteFile = (bucketName, itemName) => {
  return new Promise((resolve, reject) => {
    store.deleteObject({ Bucket: bucketName, Key: itemName }).promise()
      .then(() => resolve())
      .catch((e) => reject({ code: 500, msg: e.message }));
  });
}