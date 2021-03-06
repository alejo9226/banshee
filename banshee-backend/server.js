const dotenv = require("dotenv").config();
const express = require("express");
const { connect } = require("./src/db");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const userRouter = require("./src/routes/user");
const salesPeopleRouter = require("./src/routes/salespeople");
const meetingRouter = require("./src/routes/meeting");
const customerRouter = require("./src/routes/customer");
const locationRouter = require("./src/routes/location");

const port = process.env.PORT || 8000;

app.use(cors())
connect()
app.use(express.json())
app.use(morgan("dev"))
app.use("/user", userRouter)
app.use("/salespeople", salesPeopleRouter)
app.use("/meeting", meetingRouter)
app.use("/customer", customerRouter)
app.use("/location", locationRouter)

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`);
});
