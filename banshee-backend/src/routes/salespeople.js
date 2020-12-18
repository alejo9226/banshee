const router = require("express").Router()
const salesPeopleController = require("../controllers/salespeople.controller");
const { auth } = require("../utils/auth");

router.use(auth)
router.route('/').post(salesPeopleController.create);
router.route('/').get(salesPeopleController.list);
router.route('/:sellerid').delete(salesPeopleController.singleDelete);

module.exports = router