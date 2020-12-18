const router = require("express").Router()
const meetingController = require("../controllers/meeting.controller");
const { auth } = require("../utils/auth");

router.use(auth)
router.route('/').post(meetingController.create);
router.route('/').get(meetingController.list);
router.route('/customer/:customerid').get(meetingController.filter);
router.route('/:meetingid').get(meetingController.show);
router.route('/:meetingid').put(meetingController.updateOne)
router.route('/:meetingid').delete(meetingController.deleteOne)

module.exports = router