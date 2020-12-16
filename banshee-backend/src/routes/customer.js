const router = require("express").Router()
const customerController = require("../controllers/customer.controller")

router.route('/').post(customerController.create);
router.route('/').get(customerController.list);

module.exports = router