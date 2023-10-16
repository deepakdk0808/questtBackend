const Cart = require("../models/Cart");
const {verifyToken} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
      let cartItem = await Cart.findOne({
        user: req.body.user,
        book: req.body.book,
      }).populate("Book");

      if (cartItem) {
      let item = await Cart.findByIdAndUpdate(
          cartItem.id,
          {
            quantity: req.body.quantity,
          },
          {
            new: true,
          }
      ).populate("Book")
      res.send(item);
    } else {
      let items = await Cart.create({ ...req.body, user: req.body.user });
      res.status(200).send(items);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});



//UPDATE
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", verifyToken, async (req, res) => {
  try {
    const carts = await Cart.find({user:req.user.id}).populate(
           [ "user",
            "book",]
          );
          console.log("carts",carts)
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; 


