const Location = require('../models/location.model')
const bcrypt = require('bcrypt')

module.exports = {
  async create(req, res) {
    try {
      const location = await Location.create({
        ...req.body,
      })
      res.status(201).json({ message: 'Location Created!', data: location })
    } catch (err) {
      res.status(400).json({
        message: 'Something was wrong! Location not created',
        data: err,
      })
    }
  },
  async list (req, res) {
    try {
      const locations = await Location.find()
      res.status(200).json({ message: 'Locations found', data: locations })
    } catch (err) {
      res.status(400).json({ message: 'Locations not found', data: err })
      
    }
  },
  async deleteOne (req, res) {
    try {
      const { locationid } = req.params
      const deletedlocation = await Location.findOneAndDelete({ _id: locationid })
      res.status(200).json({ message: 'Location deleted', data: deletedlocation })
    } catch (err) {
      res.status(400).json({ message: 'Location could not be deleted', data: err })
    }
  }
  
}