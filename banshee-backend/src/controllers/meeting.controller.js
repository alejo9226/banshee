const Meeting = require('../models/meeting.model')

module.exports = {
  async create(req, res) {
    try {
      console.log('Visita', req.body)
      const seller = await Meeting.create({
        ...req.body,
      })
      
      res.status(201).json({ message: 'Seller Created!', data: seller })
    } catch (err) {
      console.log('error', err)
      res.status(400).json({
        message: 'Something was wrong! Resident not created',
        data: err,
      })
    }
  },
  async list (req, res) {
    try {
      const sellers = await Seller.find()
      console.log('vendedores', sellers)
      res.status(200).json({ message: 'Sellers found', data: sellers })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Sellers could not be found', data: err })
    }
  }
}