const router = require("express").Router()
const customerController = require("../controllers/customer.controller");
const { auth } = require("../utils/auth");

router.use(auth)
router.route('/').post(customerController.create);
router.route('/').get(customerController.list);
router.route('/:customerid').get(customerController.show);
router.route('/:customerid').delete(customerController.singleDelete);
router.route('/edit/:customerid').put(customerController.update);

module.exports = router