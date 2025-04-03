const { response } = require("express");
const { Category } = require("../models");



// getCategories - paginado - total - populate
const getCategories = async (req = request, res = response) => {
    const query = { state: true };
    const { limit = 5, since = 0 } = req.query;

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(since))
            .limit(Number(limit))
            .populate("user", "name")
    ]);

    res.json({
        total,
        categories
    });


}

//getCategory - populate {}
const getCategory = async (req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate("user", "name");

    res.json(category);
}

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }


    const category = new Category(data);

    // Guardar DB
    await category.save();

    res.status(201).json({
        msg: "Categoria creada",
        category
    });

}


//updateCategory 
const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;


    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json(category);
}

//deleteCategory - estado: false
const deleteCategory = async (req, res = response) => {
    const { id } = req.params;

    //Fisicamente lo borramos
    // const category = await Category.findByIdAndDelete(id);

    //Cambiar estado a false para no mostrarlo
    const category = await Category.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json(category);
}


module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}