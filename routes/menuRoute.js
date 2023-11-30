import express from 'express';
import {
    getOnceplat,
    addplat,
    deleteplat,
    deleteAllplats,
    getAllplats,
    upatePlate,
    updatePhotoPlate,
} from '../controllers/menuController.js';

import multer from '../middlewares/storage.js';

const router = express.Router();

router.route('/').get(getAllplats);

router.route('/getOnceplat/:id').get(getOnceplat);

router.route('/deleteAllplats').delete(deleteAllplats);

router.route('/addplat').post(multer(), addplat);

router.route('/deleteplat/:_id').delete(deleteplat);

router.route('/updatePlat/:id').put(upatePlate);

router.route('/updatePlateImage/:id').patch(multer(), updatePhotoPlate);

export default router;
