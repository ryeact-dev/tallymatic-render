const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function uploadedPhoto(file, photoUrl, desc) {
  if (!file) return;
  // delete the current photo if the user uploaded a new photo file
  photoUrl && deleteUserPhoto(photoUrl);

  const { path } = file;
  const newPath = path + `${desc}.webp`;

  // Use sharp to resize and compress the image
  await sharp(path)
    .resize({ width: 800 })
    .webp({ quality: 50 })
    .toFile(newPath);

  // Check if the file exists before attempting to delete it
  if (fs.existsSync(path)) {
    try {
      fs.unlinkSync(path);
    } catch (err) {
      console.error(`Error deleting file ${path}: ${err}`);
    }
  }

  const pathName = newPath.replace('uploads/img', '');
  return pathName;
}

function deleteUserPhoto(photoUrl) {
  fs.unlink(path.join(__dirname, '../', photoUrl), (err) => {
    if (err) {
      console.error(`Failed to delete image at ${photoUrl}: ${err.stack}`);
    }
  });
}

exports.uploadedPhoto = uploadedPhoto;
exports.deleteUserPhoto = deleteUserPhoto;
