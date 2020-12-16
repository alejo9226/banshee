const { model, Schema, models } = require("mongoose");

const customerSchema = new Schema({
  nit: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
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
  amount: {
    type: Number,
    required: true,
  },
  amountLeft: {
    type: Number,
    required: true,
  },
  meetingsRate: {
    type: Number,
    required: true,
  },
  meetings: {
    type: Schema.Types.ObjectId,
    ref: "Condo",
  }
})

const Customer = model("Customer", customerSchema);

module.exports = Customer;
