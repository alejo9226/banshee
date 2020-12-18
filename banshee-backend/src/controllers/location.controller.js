const Location = require('../models/location.model')
const bcrypt = require('bcrypt')

module.exports = {
  async create(req, res) {
    try {
      console.log('Cliente', req.body)
      const location = await Location.create({
        ...req.body,
      })
      res.status(201).json({ message: 'Location Created!', data: location })
    } catch (err) {
      console.log('error', err)
      res.status(400).json({
        message: 'Something was wrong! Location not created',
        data: err,
      })
    }
  },
  async list (req, res) {
    try {
      const locations = await Location.find()
      console.log(locations)
      res.status(200).json({ message: 'Locations found', data: locations })
    } catch (err) {
      res.status(400).json({ message: 'Locations not found', data: err })
      
    }
  }
  
}