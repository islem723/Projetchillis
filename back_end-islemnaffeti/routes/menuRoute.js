import express from 'express';
import {
    getOnceplat,
    addplat,
    deleteplat,
    deleteAllplats,
    getAllplats,
    upatePlate,
    updatePhotoPlate,
    getAllplatsByCategoryName,
    getAllplatsGroupByCategory,
} from '../controllers/menuController.js';

import multer from '../middlewares/storage.js';

const router = express.Router();

router.route('/').get(getAllplats);

router.route('/getOnceplat/:id').get(getOnceplat);

router.route('/deleteAllplats').delete(deleteAllplats);

router.route('/addplat').post(multer(), addplat);

router.route('/deleteplat/:_id').delete(deleteplat);

router.route('/getByCategoryName').get(getAllplatsByCategoryName);

router.route('/getMealsGrouped').get(getAllplatsGroupByCategory);

router.route('/updatePlat/:id').put(upatePlate);

router.route('/updatePlateImage/:id').patch(multer(), updatePhotoPlate);

export default router;
