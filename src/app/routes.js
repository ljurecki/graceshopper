const router = require("express").Router();
const productController = require("./controller");
const cartController = require("./controller");
const multerInstance = require('../../config/multer')
router.post("/", multerInstance.upload.single('image'), productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.removeProduct);
router.post("/", cartController.addItemToCart);
router.get("/", cartController.getCart);
router.delete("/empty-cart", cartController.emptyCart);
module.exports = router;