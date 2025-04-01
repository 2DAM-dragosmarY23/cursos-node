const { response } = require("express");
const { Product } = require("../models");



// getProducts - paginado - total - populate
const getProducts = async (req = request, res = response) => {
    const query = { state: true };
    const { limit = 5, since = 0 } = req.query;

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(since))
            .limit(Number(limit))
            .populate("user", "name")
            .populate("category", "name")
    ]);

    res.json({
        total,
        products
    });


}

//getProduct - populate {}
const getProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate("user", "name")
        .populate("category", "name");

    res.json(product);
}

const createProduct = async (req, res = response) => {
    console.log("Cuerpo de la solicitud:", req.body); // Agrega este log para depurar

    const { state, user, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.name });

    if (productDB) {
        return res.status(400).json({
            msg: `El producto ${productDB.name}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    };

    const product = new Product(data);

    // Guardar DB
    await product.save();

    res.status(201).json({
        msg: "Producto creado",
        product
    });
};


//updateProduct 
const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();        
    }
    data.user = req.user._id;


    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json(product);
}



//deleteProduct - estado: false
const deleteProduct = async (req, res = response) => {
    const { id } = req.params;

    //Fisicamente lo borramos
    // const product = await Product.findByIdAndDelete(id);

    //Cambiar estado a false para no mostrarlo
    const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json(product);
}


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}