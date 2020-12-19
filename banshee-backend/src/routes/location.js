const router = require("express").Router()
const locationController = require('../controllers/location.controller');
const { auth } = require("../utils/auth");

router.use(auth)
router.route("/").post(locationController.create);
router.route("/").get(locationController.list)
router.route("/:locationid").delete(locationController.deleteOne)

module.exports = router;