import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const options = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '../../../../..', process.env.STATIC_DIR),
    filename: (_req, file, callback) => {
      const hash = crypto.randomBytes(10).toString('hex');
      return callback(null, `${hash}-${file.originalname}`);
    },
  }),
};

export default multer(options);
