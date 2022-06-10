const { Router } = require("express");
const { checkTenant } = require("../middlewares/index");

const organizationRouter = require("./organization");
const authRouter = require("./auth");
const userRouter = require("./user");
const communicationRouter = require("./communication");
const router = Router();

router.use("/organization", organizationRouter);
router.use("/auth", checkTenant, authRouter);
router.use("/user", checkTenant, userRouter);
router.use("/communication", checkTenant, communicationRouter);

module.exports = router;
