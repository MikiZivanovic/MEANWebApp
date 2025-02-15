const mongose = require("mongoose");
const { path } = require("../app");

const wineSchema = new mongose.Schema(
  {
    name: {
      type: String,
      required: [true, "A wine must have a name"],
      unique: true,
      trim: true,
      maxlength: [50, "A wine name must have less or equal then 50 characters"],
      minlength: [4, "A wine name must have more or equal then 4 characters"],
    },
    year:{
      type:Number
    },
    imageCover : {
      type: String,
    },
    images:[String],
    price: {
      type: Number,
      required: [true, "A wine must have a price"],
    },
    quantityState: {
      type: Number,
      required: [true, "A wine must have a quantityState"],
    },
    styles: [
      {
        type: mongose.Schema.ObjectId,
        ref: "Style",
        required: [true, "A wine must have style"],
      },
    ],
    varieties: {
      type: mongose.Schema.ObjectId,
      ref: "Variety",
      required: [true, "A wine must have varity"],
    },
    expo:[{
        position: {
          latitude: {
            type: Number,
            required: [true, 'Latitude is required for the branch location.'],
          
          },
          longitude: {
            type: Number,
            required: [true, 'Longitude is required for the branch location.'],
           
          },
        },
      }],
    description : {
        type: String,
        required: [true, "A wine must have a description"],
    },
    volume : {
      type: String,
      required: [true, "A wine must have a volume"],
    },
    origin : {
      type: String,
      required: [true, "A wine must have a origine"],
    },
    alcohol : {
      type: String,
      required: [true, "A wine must have a alcohol precentage"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Wine = mongose.model("Wine", wineSchema);

module.exports = Wine;
