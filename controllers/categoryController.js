import plateCategory from "../models/plateCategory.js";

export async function addcategory(req, res) {
    try {
      
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ error: 'Category name is required' });
        }

    
        const category = await plateCategory.create({
            categoryName: categoryName,
        });

     
        if (!category) {
            return res.status(400).json({ error: 'Error adding category' });
        }

        return res.status(201).json({
            message: 'Your category was added successfully!',
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

