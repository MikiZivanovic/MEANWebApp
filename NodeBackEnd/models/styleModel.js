const mongose = require("mongoose");

const styleSchema = new mongose.Schema(
  {
    name: {
      type: String,
      required: [true, "A stile must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        10,
        "A style name must have less or equal then 10 characters",
      ],
      minlength: [4, "A syile name must have more or equal then 4 characters"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Style = mongose.model("Style", styleSchema);

module.exports = Style;
