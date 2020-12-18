const { model, Schema, models } = require("mongoose");

const locationSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
}, 
{
  timestamps: true
}
)

const Location = model("Location", locationSchema);

module.exports = Location;
