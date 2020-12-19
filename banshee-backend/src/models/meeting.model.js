const { model, Schema, models } = require("mongoose");

const meetingSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  netAmount: {
    type: Number,
    required: true,
  },
  meetingValue: {
    type: Number,
    required: true

  },
  comments: {
    type: String
  }
}, 
{
  timestamps: true
}
)

meetingSchema.post('findOneAndDelete', async function(doc) {
  
  const customer = await models.Customer.findByIdAndUpdate(doc.customer)
  customer.amountLeft += doc.meetingValue
  const index = customer.meetings.findIndex(meeting  => {
    return meeting === doc._id
  })
  customer.meetings.splice(index, 1)
  
  customer.save({ validateBeforeSave: false })

})
meetingSchema.pre('save', async function () {
  if (this._id) {
    const customer = await models.Customer.findById(this.customer)
    customer.amountLeft -= this.meetingValue
    customer.meetings.push(this._id)
    customer.save({ validateBeforeSave: false })
    
    const seller = await models.Seller.findById(this.seller)
    seller.meetings.push(this._id)
    seller.save({ validateBeforeSave: false }) 
  }
})

const Meeting = model("Meeting", meetingSchema);

module.exports = Meeting;
