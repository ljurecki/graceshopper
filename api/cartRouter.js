const express = require("express");
const {
  getCart,
  addProductToCart,
  deleteCartItem,
  checkoutCart,
}
= require("../db/cart");



/*getCartProductById*/
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  if (!req.user) {
    res.send({ error: "Need token." });
    return;
  }
  const cart = await getCart(req.user.id);
  res.send({ cart });
});



/*add product*/
cartRouter.post("/add-product", async (req, res) => {
  try {
    if (!req.user) {
      res.send({ error: "Need to login to add to cart." });
      return;
    }
    const cartItem = await addProductToCart(req.body);
    res.send({ cartItem });
  } catch (error) {
    res.send({ error: error.message });
  }
});


/*delete item in cart*/

cartRouter.delete("/delete-item/:cartItemId", async (req, res) => {
  try {
    if (!req.user) {
      res.send({ error: "No to login to delete." });
      return;
    }
    const info = await getUserIdByCartItemId(req.params.cartItemId);
    if (!info || !info.user_id) {
      res.send({ error: "No item to delete" });
      return;
    }
    if (info.user_id !== req.user.id) {
      res.send({
        error: "You are not authorized for this transaction.",
      });
      return;
    }
    const cartItem = await deleteCartItem(req.params.cartItemId);
    res.send({ cartItem });
  } catch (error) {
    res.send({ error: error.message });
  }
});

/*Checkout*/
cartRouter.patch("/:cartId/checkout", async (req, res) => {
  try {
    if (!req.user) {
      res.send({ error: "No token present with request." });
      return;
    }
    const cartItem = await checkoutCart(req.params.cartId);
    res.send({ cartItem });
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = cartRouter;