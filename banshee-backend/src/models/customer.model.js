const { model, Schema, models } = require("mongoose");

const customerSchema = new Schema({
  nit: {
    type: String,
    required: true,
    validate: {
      async validator(nit) {
        try {
          const customer = await models.Customer.findOne({ nit });
          return !customer;
        } catch (err) {
          return false;
        }
      },
      message: "Cliente ya existe",
    },
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
  meetings: [{
    type: Schema.Types.ObjectId,
    ref: "Meeting",
  }]
})

customerSchema.post('findOneAndUpdate', async function() {
  const updatedCustomer = this._update['$set']

  const customer = await Customer.findOne({ _id: updatedCustomer._id })

  for (let i = 0; i < customer.meetings.length; i++) {
  const meeting = await models.Meeting.findOne({ _id: customer.meetings[i] })
  meeting.meetingValue = (updatedCustomer.meetingsRate / 100) * meeting.netAmount
  meeting.save({ validateBeforeSave: false })
  }
  customer.save({ validateBeforeSave: false })
  

})
customerSchema.post('findOneAndDelete', async function(doc) {
  
  await models.Meeting.deleteMany({ customer: doc._id })
  
})

const Customer = model("Customer", customerSchema);

module.exports = Customer;
