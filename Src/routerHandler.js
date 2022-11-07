const productRoutes = require("./Product/routes")
module.exports = app => {
    app.use("/product", productRoutes);
}