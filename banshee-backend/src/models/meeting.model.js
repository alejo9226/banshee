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

const Meeting = model("Seller", meetingSchema);

module.exports = Meeting;
