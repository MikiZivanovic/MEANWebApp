const mongose = require("mongoose");
const { path } = require("../app");
 
const orderSchema = new mongose.Schema(
  {
    
    totalprice: {
      type: Number,
      required: [true, "A order must have a price"],
    },
    items: [
      {
        quantity: {
          type: Number,
          required: [true, "An order item must have a quantity"],
          min: [1, "Quantity must be at least 1"],
        },

        wine: {
          type: mongose.Schema.ObjectId,
          ref: "Wine",
          required: [true, "A order item must have wine"],
        },
      },
    ],
    user: {
          type: mongose.Schema.ObjectId,
          ref: "User",
          required: [true, "A order must have user"],
        }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Order = mongose.model("Order", orderSchema);

module.exports = Order;
