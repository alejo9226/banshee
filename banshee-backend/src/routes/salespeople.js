const router = require("express").Router()
const salesPeopleController = require("../controllers/salespeople.controller")

router.route('/').post(salesPeopleController.create);
router.route('/').get(salesPeopleController.list);

module.exports = router