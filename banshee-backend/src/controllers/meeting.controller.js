const Meeting = require('../models/meeting.model')
const Customer = require('../models/customer.model')

module.exports = {
  async create(req, res) {
    try {
      const { customer, netAmount } = req.body
      const customerVisited = await Customer.findOne({_id: customer})
      const meeting = await Meeting.create({
        ...req.body,
        meetingValue: (customerVisited.meetingsRate / 100) * parseInt(netAmount)
      })
      res.status(201).json({ message: 'Meeting Created!', data: meeting })
    } catch (err) {
      res.status(400).json({
        message: 'Something was wrong! Meeting not created',
        data: err,
      })
    }
  },
  async list (req, res) {
    try {
      const meetings = await Meeting.find().populate('seller', 'name').populate('customer', 'fullname')
      res.status(200).json({ message: 'Meeting found', data: meetings })
    } catch (err) {
      res.status(400).json({ message: 'Meeting could not be found', data: err })
    }
  },
  async filter (req, res) {
    const { customerid } = req.params
    try {
      const meetings = await Meeting.find({ customer: customerid }).populate('seller', 'name').populate('customer', 'fullname')
      res.status(200).json({ message: 'Meeting found', data: meetings })
    } catch (err) {
      res.status(400).json({ message: 'Meeting could not be found', data: err })
    }
  },
  async show (req, res) {
    try {
      const { meetingid } = req.params
      const meeting = await Meeting.findOne({ _id: meetingid })
      res.status(200).json({ message: 'Meeting found', data: meeting })
    } catch (err) {
      res.status(400).json({ message: 'Customer not found', data: err })
    }
  },
  async deleteOne (req, res) {
    try {
      const { meetingid } = req.params
      const deletedMeeting = await Meeting.findOneAndDelete({ _id: meetingid })
      res.status(200).json({ message: 'Meeting deleted', data: deletedMeeting })
    } catch (err) {
      res.status(400).json({ message: 'Meeting not deleted', data: err })
    }
  },
  async updateOne (req, res) {
    try {
      const { meetingid } = req.params
      const meetingToUpdate = req.body
      const updatedMeeting = await Meeting.findOneAndUpdate({ _id: meetingid }, {...meetingToUpdate })
      res.status(200).json({ message: 'Meeting updated', data: updatedMeeting })

    } catch (err) {
      res.status(400).json({ message: 'Meeting not updated', data: err })
    }
  }
}