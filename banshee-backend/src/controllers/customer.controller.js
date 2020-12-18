const Customer = require('../models/customer.model')
const bcrypt = require('bcrypt')
const { populate } = require('../models/customer.model')

module.exports = {
  async create(req, res) {
    try {
      console.log('Cliente', req.body)
      const { nit, amount } = req.body
      
      const customers = await Customer.find()
      console.log('Clientes existentes', customers)
      let foundNit = await Promise.all(
        customers.filter(async customer => {
        const isValid = await bcrypt.compare(nit, customer.nit)
        console.log('isvalid', isValid)
        return isValid
      }))
      console.log('foundNit', foundNit)
      /* if (!foundNit) {
        throw new Error('Customer already exists')
      }

      const encNit = await bcrypt.hash(nit, 8)
      const customer = await Customer.create({
        ...req.body,
        amountLeft: amount,
        nit: encNit,
      })
      res.status(201).json({ message: 'Customer Created!', data: customer }) */
    } catch (err) {
      console.log('error', err)
      res.status(400).json({
        message: 'Something was wrong! Customer not created',
        data: err,
      })
    }
  },
  async list (req, res) {
    try {
      const customers = await Customer.find()
      console.log(customers)
      res.status(200).json({ message: 'Customers found', data: customers })
    } catch (err) {
      res.status(400).json({ message: 'Customers not found', data: err })
      
    }
  },
  async show (req, res) {
    try {
      const { customerid } = req.params
      console.log(customerid)
      const customer = await Customer.findOne({ _id: customerid })
      .populate({ path:'meetings', populate: { path: 'seller', model: 'Seller', select: 'name'}})
      .populate({ path:'meetings', populate: { path: 'customer', model: 'Customer', select: 'fullname'}})
      console.log('el cliente que encuentra', customer)
      res.status(200).json({ message: 'Customer found', data: customer })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Customer not found', data: err })
    }
  },
  async singleDelete (req, res) {
    try {
      const { customerid } = req.params
      console.log(customerid)
      const deletedCustomer = await Customer.findOneAndDelete({ _id: customerid })
      console.log(deletedCustomer)
      res.status(200).json({ message: 'Customer deleted', data: deletedCustomer })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Customer could not be deleted', data: err })
    }
  },
  async update (req, res) {
    try {
      const toUpdate = req.body
      delete toUpdate.meetings
      console.log('para acgtualizar', toUpdate)
      const { customerid } = req.params
      console.log(customerid)
      const updatedCustomer = await Customer.findByIdAndUpdate({ _id: customerid }, {...toUpdate })
      console.log(updatedCustomer)
      res.status(200).json({ message: 'Customer updated', data: updatedCustomer })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Customer could not be updated', data: err })
    }
  }
  
}