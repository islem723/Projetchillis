import menu from '../models/menu.js';
import deletImage from '../services/imageDel.js';

export async function addplat(req, res) {
    try {
        const { platname, price, plateType } = req.body;

        const plat = await menu.create({
            platname: platname,
            price: price,
            plateType: plateType,
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
    return res.send(await menu.find({}));
}

export async function deleteplat(req, res) {
    try {
        const { _id } = req.params;

        const deletedMenu = await menu.deleteOne({ _id: _id });

        if (!deletedMenu.deletedCount) {
            return res.status(404).send({ error: 'Menu not found' });
        }

        return res.status(200).send({ menu: 'success', deletedMenu });
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
    const { platname, price, plateType } = req.body;
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
                plateType: plateType,
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
        const result = await menu.deleteMany({});

        if (result.deletedCount === 0) {
            return res.status(200).send({ error: 'No data to delete' });
        }

        return res
            .status(200)
            .send({ message: 'All plates have been deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
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
        return res.status(404).json({ error: 'No plate found!' });
    }

    deletImage(platePhoto?.image, async (err) => {
        if (err) {
            return res
                .status(500)
                .json({ error: 'Could not update the plate!' });
        }

        res.status(200).json({ message: 'Plate updated successfully!' });
    });
}
