const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');

const projectId = 'YOUR PROJECT ID';
let gcs = new Storage({
  projectId,
});
const os = require('os');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs-extra');

exports.onFileChange = functions.storage.object().onFinalize(async object => {
  console.log(object);
  const bucket = object.bucket;
  const contentType = object.contentType;
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const fileDir = path.dirname(filePath);

  const destBucket = gcs.bucket(bucket);
  const workingDir = path.join(os.tmpdir(), 'thumbs');
  const tmpFilePath = path.join(workingDir, fileName);

  const metadata = {
    contentType: contentType,
  };

  console.log('file detected', fileDir, fileName);

  if (fileName.startsWith('thumb-')) {
    return console.log('already renamed this file');
  }
  if (!contentType.startsWith('image/')) {
    return console.log('this is not an image file');
  }

  // 1. Ensure thumbnail dir exists
  await fs.ensureDir(workingDir, (err, made) => {
    if (err) return console.error(err);
    console.log('directory exists');
  });

  // 2. Download Source File
  await destBucket.file(filePath).download({
    destination: tmpFilePath,
  });
  console.log('Image downloaded locally to', tmpFilePath);
  // 3. Resize the images and define an array of upload promises

  // 3. Resize the images and define an array of upload promises
  const sizes = [400];

  const uploadPromises = sizes.map(async size => {
    const thumbName = `thumb-${size}-${fileName}`;
    const thumbPath = path.join(workingDir, thumbName);

    // Resize source image
    await sharp(tmpFilePath)
      .resize(size, size)
      .toFile(thumbPath);

    // Upload to GCS
    return destBucket.upload(thumbPath, {
      destination: path.join(fileDir, thumbName),
      metadata: metadata,
    });
  });

  // 4. Run the upload operations
  await Promise.all(uploadPromises);

  // 5. Cleanup remove the tmp/thumbs from the filesystem
  return fs.remove(tmpFilePath).then(() => {
    return fs.remove(fileDir);
  });
});
