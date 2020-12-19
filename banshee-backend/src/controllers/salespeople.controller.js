const Seller = require('../models/salespeople.model')

module.exports = {
  async create(req, res) {
    try {
      const seller = await Seller.create({
        ...req.body,
      })
      
      res.status(201).json({ message: 'Seller Created!', data: seller })
    } catch (err) {
      res.status(400).json({
        message: 'Something was wrong! Resident not created',
        data: err,
      })
    }
  },
  async list (req, res) {
    try {
      const sellers = await Seller.find()
      res.status(200).json({ message: 'Sellers found', data: sellers })
    } catch (err) {
      res.status(400).json({ message: 'Sellers could not be found', data: err })
    }
  },
  async singleDelete (req, res) {
    try {
      const { sellerid } = req.params
      const deletedSeller = await Seller.findOneAndDelete({ _id: sellerid })
      res.status(200).json({ message: 'Seller deleted', data: deletedSeller })
    } catch (err) {
      res.status(400).json({ message: 'Seller could not be deleted', data: err })
    }
  },
}