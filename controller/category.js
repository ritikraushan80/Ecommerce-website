const { categories } = require('../models')

async function createCategory(req, res) {
    const data = req.body;
    const name = data.name;
    const description = data.description;

    try {
        const result = await categories.create({ name, description })
        console.log('result: ', result);
        res.send({ msg: ' Category has been created' })
    } catch (err) {

        console.log('Error in creation of categories', err);

        res.status(500).send({ msg: ':Internal server error' })
    }
}

async function getCategories(req, res) {

    try {
        const data = await categories.findAll()

        res.send(data)
    } catch (err) {

        console.log('Error in getting of categories', err);

        res.status(500).send({ msg: ':Internal server error' })
    }

}


async function getCategoryOnId(req, res) {
    const categoryId = req.params.name
    try {

        const result = await categories.findOne({
            where: {
                name: categoryId
            }
        })
        res.send(result)
    } catch (err) {

        console.log('Error in getting by id of categories', err);

        res.status(500).send({ msg: ':Internal server error' })
    }

}

async function updateCategoryOnId(req, res) {
    const categoryId = req.params.id;
    const name = req.body.name;
    const description = req.body.description

    try {
        const result = await categories.findOne({
            whare: {
                id: categoryId
            }
        })
        if (result) {
            result.name = req.body.name;
            result.description = req.body.description;

            result.save()

        }
        res.send({ msg: 'Category got updated', result })
    } catch (err) {

        console.log('Error in getting by id of categories', err);

        res.status(500).send({ msg: ':Internal server error' })

    }
}

async function DeleteCategory(req, res) {
    const categoryId = req.params.id;

    try {
        const result = await categories.destroy({
            where: {
                id: categoryId
            }
        })
        res.send({ msg: 'Category deleted Successfully', result })
    } catch (err) {

        console.log('Error in deleting categories', err);

        res.status(500).send({ msg: ':Internal server error' })

    }
}
module.exports = {
    createCategory,
    getCategories,
    getCategoryOnId,
    updateCategoryOnId,
    DeleteCategory
}