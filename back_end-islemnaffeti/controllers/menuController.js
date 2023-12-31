import menu from '../models/menu.js';

import PlateCatModel from '../models/plateCategory.js';
import deletImage from '../services/imageDel.js';

export async function addplat(req, res) {
    try {
        const { categoryName } = req.query;

        const category = await PlateCatModel.findOne({
            categoryName: categoryName,
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found!' });
        }

        const { platname, price } = req.body;

        const plat = await menu.create({
            platname: platname,
            price: price,
            plateCategory: category,
            image: `${req.file.filename}`,
        });

        if (!plat) {
            return res.status(400).json({ error: 'error adding plate' });
        }

        return res.status(201).json({
            message: ' Your Plate Added Successfully!',
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'error adding ' });
    }
}

export async function getAllplats(req, res) {
    return res.send(await menu.find({}).populate('plateCategory'));
}

export async function getAllplatsByCategoryName(req, res) {
    const { categoryName } = req.query;

    const category = await PlateCatModel.findOne({
        categoryName: categoryName,
    });

    if (!category) {
        return res.status(404).json({ error: 'Category Not Found!' });
    }

    const allPlates = await menu
        .find({ plateCategory: category }, { __v: 0 })
        .populate('plateCategory');

    return res.send(
        allPlates.filter((a) => a.plateCategory.categoryName === categoryName)
    );
}

export async function getAllplatsGroupByCategory(req, res) {
    const categories = await PlateCatModel.find({});
    const mealsByCategory = [];

    for (const c of categories) {
        const meals = await menu.find({ plateCategory: c }).limit(6);

        mealsByCategory.push({
            category: c.categoryName,
            data: meals,
        });
    }

    return res.send(mealsByCategory);
}

export async function deleteplat(req, res) {
    try {
        const { _id } = req.params;

        const found = await menu.findOne({ _id: _id });

        if (!found) {
            return res.status(404).json({ error: 'Plate not found!' });
        }

        const imageName = found.image;

        const deletedMenu = await menu.deleteOne({ _id: _id });

        if (!deletedMenu.deletedCount) {
            return res.status(404).send({ error: 'Menu not found' });
        }

        deletImage(imageName, (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: 'Could not delete the palte image!' });
            }

            return res.status(200).json({
                message: 'Plate deleted successfully!',
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

export async function getOnceplat(req, res) {
    const foundPlat = await menu.findOne({ _id: req.params.id });

    if (!foundPlat) {
        return res.status(404).json({ error: 'Plate not found' });
    }

    return res.send(foundPlat);
}

export async function upatePlate(req, res) {
    const { id } = req.params;
    const { platname, price } = req.body;
    const plate = await menu.findOne({ _id: id });

    if (!plate) {
        return res.status(404).json({ error: 'No plate to update!' });
    }

    const updateCount = await menu.updateOne(
        {
            _id: id,
        },
        {
            $set: {
                platname: platname,
                price: price,
            },
        },
        {
            upsert: false,
        }
    );

    if (!updateCount.modifiedCount) {
        return res.status(404).json({ error: 'Failed to update the plate.' });
    }
    return res.status(200).json({ message: 'Successfully updated the plate!' });
}

export async function deleteAllplats(req, res) {
    try {
        let delCount = 0;

        const platesImages = (await menu.find({}, { image: 1 })).map(
            (p) => p.image
        );

        platesImages.forEach(function (plate) {
            deletImage(plate.image, function (err) {
                if (err) {
                    return res.status(500).json({ error: err });
                }
            });
            delCount++;
        });

        if (!delCount) {
            return res
                .status(500)
                .json({ error: 'Could not delete the paltes images!' });
        }

        const result = await menu.deleteMany({});

        if (!result.deletedCount) {
            return res.status(200).send({ error: 'No data to delete' });
        }

        return res
            .status(200)
            .json({ message: 'All plates have been deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
}

//update  photo product
export async function updatePhotoPlate(req, res) {
    const { id } = req.params;

    const platePhoto = await menu.findOne({ _id: id }, { image: 1 });

    if (platePhoto == null)
        return res.status(404).json({
            error: `Plate with id ${id} could not be found!`,
        });

    const updateResult = await menu.updateOne(
        { _id: id },
        {
            image: `${req.file.filename}`,
        },
        { upsert: false }
    );

    if (updateResult.modifiedCount == 0) {
        return res.status(400).json({ error: 'No plate found!' });
    }

    res.status(200).json({ message: 'Plate updated successfully!' });
}
