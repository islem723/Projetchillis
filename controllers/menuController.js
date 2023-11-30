import menu from '../models/menu.js';

export async function addplat(req, res) {
    try {
        const plat = await menu.create({
            platname: req.body.platname,
            price: req.body.price,
            title: req.body.title,
            image: `${req.file.filename}`,
        });
        if (!plat) {
            return res.status(400).json({ error: 'error adding ' });
        }
        return res.status(201).json({
            message: ' Your Post Added Successfully!',
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

        if (deletedMenu.deletedCount === 0) {
            return res.status(404).send({ error: 'Menu not found' });
        }

        return res.status(200).send({ menu: 'success', deletedMenu });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

export async function getOnceplat(req, res) {
    const foundPlat = await menu.findOne({ id: req.params.id });

    if (!foundPlat) {
        return res.status(404).json({ error: 'Plate not found' });
    }

    return res.send(foundPlat);
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
