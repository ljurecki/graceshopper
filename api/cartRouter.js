const express = require("express");
const cartRouter = express.Router();
const {
    getCartProductById,
    addProductToCart,
    getCart,
    destroyCartProduct,
    updateCartProduct,
} = require("../db");
const { requireUser } = require("./utils");

cartRouter.get('/', async (req, res) => {
    const cart = await getCart(req.user.id);
    res.send(cart);
});

cartRouter.post('/', requireUser, async (req, res, next) => { //tested working
    try {
        const { productId, qty } = req.body;
        const cartItem = await addProductToCart({ cartId: req.user.id, productId, qty })

        res.send(cartItem)
    } catch (error) {
        next(error);
    }
});

/*delete item in cart*/
cartRouter.delete("/:cartProductId", requireUser, async (req, res, next) => {
    console.log('end delete route')
    const { cartProductId } = req.params;
    try {
        const _cartProduct = await getCartProductById(cartProductId);
        console.log(_cartProduct)

        if (_cartProduct) {
            res.status(403).send({
                error: 'UserCannotDeleteProduct',
                name: 'User cannot delete product',
                message,
            });
        } else {
            const removeCartProduct = await destroyCartProduct(cartProductId);
            next(removeCartProduct);
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});


cartRouter.patch('/:cartProductId', requireUser, async (req, res, next) => { 
    const { cartProductId } = req.params;
  
    try {
      const { qty } = req.body;
      const updateFields = {};

      if (cartProductId) {
        updateFields.id = cartProductId;
      }

      if (qty) {
        updateFields.qty = qty;
      }
  
      const _cartProduct = await getCartProductById(cartProductId);
  
      if (!_cartProduct) {
        res.send({
          error: 'CartProductDoesNotExists',
          title: 'Cart Product does not exists',
          message: ProductNotFoundError(cartProductId),
        });
      } else {
        const updateCartQty = await updateCartProduct(updateFields);
        res.send(updateCartQty);
      }
    } catch (error) {
      next(error);
    }
  });
  


module.exports = cartRouter;