import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads/products',

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG and WEBP images are allowed'));
    }
  },
});
