const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  async create(req, res) {
    try {
      const { password } = req.body
      console.log(password)
      const encPassword = await bcrypt.hash(password, 8)
      const user = await User.create({ ...req.body, password: encPassword })
      console.log(user)
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
      })

      res.status(201).json({ token, message: 'Registro exitoso' })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err.message })
    }
  },
  async signin(req, res) {
    try {
      const { email, password } = req.body
      console.log(req.body)
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('Usuario o contraseña invalida')
      }

      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid) {
        throw new Error('Usuario o contraseña invalida')
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      )

      res.status(200).json({ token, name: user.name })
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: err.message })
    }
  },
  async show(req, res) {
    try {
      const userId = req.user
      const user = await User.findOne({ _id: userId })

      res.status(200).json({
        message: 'user found',
        data: user.name,
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'user could not be found' })
    }
  },
  async list (req, res) {
    try {
      const users = await User.find()
      console.log('vendedores', users)
      res.status(200).json({ message: 'Users found', data: users })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Users could not be found', data: err })
    }
  }
}