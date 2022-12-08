import { model } from "mongoose";
import multer from "multer";

const Localstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `public-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "png" ||
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "jpeg" ||
    file.mimetype.split("/")[1] === "gif"

  ) {
    cb(null, true);
  } else {
    cb(new Error("invalid"), false);

  }
};
const upload = multer({
  fileFilter: multerFilter,
  storage: Localstorage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },

}).array('image', 12)

export default upload
