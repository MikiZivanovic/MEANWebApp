const mongose = require("mongoose");

const varietySchema = new mongose.Schema(
  {
    name: {
      type: String,
      required: [true, "A variety must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        10,
        "A variety name must have less or equal then 50 characters",
      ],
      minlength: [
        4,
        "A variety name must have more or equal then 4 characters",
      ],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Variety = mongose.model("Variety", varietySchema);

module.exports = Variety;
