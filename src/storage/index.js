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
    store.createMultipartUpload({
      Bucket: bucketName,
      Key: itemName
    }).promise().then((data) => {
      let uploadID = data.UploadId;

      let partSize = 1048576; // 1MB part (1024*1024)
      let partCount = Math.ceil(fileData.length / partSize);

      let promises = [], partNum = 0;
      for (; partNum < partCount;) {
        promises.push(new Promise((resolve, reject) => {

          let partStart = partNum * partSize;
          let partEnd = Math.min(partStart + partSize, fileData.length);
          partNum++;

          store.uploadPart({
            Body: fileData.slice(partStart, partEnd),
            Bucket: bucketName,
            Key: itemName,
            PartNumber: partNum,
            UploadId: uploadID
          }).promise().then((data) => {
            resolve({ ETag: data.ETag, PartNumber: partNum })
          }).catch((err) => {
            reject(err)
          });
        }));
      }
      Promise.all(promises).then(dataPacks =>
        store.completeMultipartUpload({
          Bucket: bucketName,
          Key: itemName,
          MultipartUpload: { Parts: dataPacks },
          UploadId: uploadID
        }).promise().then(() => {
          resolve();
        }).catch((err) => _cancelMultiPartUpload(bucketName, itemName, uploadID)
          .then(() => reject({ code: 500, msg: err.message }))
          .catch(error => reject({ code: 500, msg: error.message }))
        )).catch(err => _cancelMultiPartUpload(bucketName, itemName, uploadID)
          .then(() => reject({ code: 500, msg: err.message }))
          .catch(error => reject({ code: 500, msg: error.message })));
    }).catch(error => reject({ code: 500, msg: error.message }));
  })
}

exports.downloadFile = (bucketName, imageName) => {
  return new Promise((resolve, reject) => {
    store.getObject({
      Bucket: bucketName,
      Key: imageName
    }).promise().then((data) => {
      if (data != null) resolve(data.Body);
      else reject({ code: 500, msg: "File not found" });
    }).catch((error) => reject({ code: 500, msg: error.message }));
  });
}

exports.deleteFile = (bucketName, itemName) => {
  return new Promise((resolve, reject) => {
    store.deleteObject({
      Bucket: bucketName,
      Key: itemName
    }).promise()
      .then(() => resolve())
      .catch((e) => reject({ code: 500, msg: e.message }));
  });
}

//// PRIVATE ////

_cancelMultiPartUpload = (bucketName, itemName, uploadID) => {
  return new Promise((resolve, reject) => {
    cos.abortMultipartUpload({
      Bucket: bucketName,
      Key: itemName,
      UploadId: uploadID
    }).promise().then(() => {
      resolve();
    }).catch((e) => reject(e));
  });
}