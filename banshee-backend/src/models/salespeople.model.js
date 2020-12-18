const { model, Schema, models } = require("mongoose");

const sellerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  meetings: [{
    type: Schema.Types.ObjectId,
    ref: 'Meeting'
  }]
},
{
  timestamps: true
})

const Seller = model("Seller", sellerSchema);

module.exports = Seller;
