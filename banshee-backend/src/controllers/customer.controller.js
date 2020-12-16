const Customer = require('../models/customer.model')
const bcrypt = require('bcrypt')

module.exports = {
  async create(req, res) {
    try {
      console.log('Cliente', req.body)
      const { nit, amount } = req.body
      const encNit = await bcrypt.hash(nit, 8)
      const resident = await Customer.create({
        ...req.body,
        amountLeft: amount,
        nit: encNit,
      })
      res.status(201).json({ message: 'Resident Created!', data: resident })
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
      const customers = await Customer.find()
      res.status(200).json({ message: 'Customers found', data: customers })
    } catch (err) {
      res.status(400).json({ message: 'Customers not found', data: err })
      
    }
  }
  
}