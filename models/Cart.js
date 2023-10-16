const mongoose = require("mongoose");

//one to one relation between cart and user,as one user can only use one cart vice-versa
const CartSchema = new mongoose.Schema(
  {
    book:{type:mongoose.Schema.Types.ObjectId, ref:"Book", required:true },
    user:{type:mongoose.Schema.Types.ObjectId,  ref:"User", required:true},
    quantity:{type:Number, required:true, min:1}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);