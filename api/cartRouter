const express = require("express");
const cartRouter = express.Router();
const {
    getProductById,
    deleteCartProduct,
} = require("../db");
const { requireUser } = require("./utils");


cartRouter.get("/", requireUser, async (req, res) => {

    const cart = await getCart(req.user.id);
    res.send({ cart });
});

// PATCH /api/cart_products/:productId
cartRouter.patch('/:productId', requireUser, async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;

        const product = await getProductById(productId);
        const cart = await getCartProductById(product.productId);


        if (cartId === req.user.id) {
            const { qty } = req.body;
            const addProductToCart = {};

            if (qty) {
                addProductToCart.qty = qty;
            }

        } else {
            res.send({
                error: 'UserUnauthorized',
                name: 'User unauthorized to update this cart',
                message: UnauthorizedUpdateError(req.user.username, product.title),
            });
        }
    } catch (error) {
        res.send({ error: error.message });
    }
});


/*delete item in cart*/
cartRouter.delete("/:productId", requireUser, async (req, res) => {
    const { productId } = req.params;
    try {
        const _product = await getCartProductById(productId);

        if (_product.shopperId !== req.user.id) {
            res.status(403).send({
                error: 'UserCannotDeleteProduct',
                name: 'User cannot delete product',
                message: UnauthorizedDeleteError(req.user.username, _routine.name),
            });
        } else {
            const deleteProduct = await deleteCartProduct(_product.id);
            res.send(deleteProduct);
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

/*Checkout*/
// cartRouter.patch("/:cartId/checkout", async (req, res) => {
//   try {
//     if (!req.user) {
//       res.send({ error: "No token present with request." });
//       return;
//     }
//     const cartItem = await checkoutCart(req.params.cartId);
//     res.send({ cartItem });
//   } catch (error) {
//     res.send({ error: error.message });
//   }
// });

module.exports = cartRouter;
