const productRoutes = require("./Product/routes");
const cartRoutes = require('./Cart/routes')
module.exports = app => {
    app.use("/product", productRoutes);
    app.use("/cart", cartRoutes);
}