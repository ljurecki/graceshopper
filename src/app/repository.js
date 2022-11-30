const Product = require("./model");
exports.products = async () => {
    const products = await Product.find();
    return products;
};
exports.productById = async id => {
    const product = await Product.findById(id);
    return product;
}
exports.createProduct = async payload => {
    const newProduct = await Product.create(payload);
    return newProduct
}
exports.removeProduct = async id => {
    const product = await Product.findByIdAndRemove(id);
    return product
}

const Cart = require("./model");
exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price total"
    });;
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}