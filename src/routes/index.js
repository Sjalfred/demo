const router = require("express").Router();
const ctrlAuth = require('../lib/auth');
const healthcheck = require("./healthcheck");
const flight = require("./flight");
const price = require("./price");
const auth = require("./auth");

router.use("/healthcheck",healthcheck)

//authorise and provide jwt token
router.use("/auth", auth);

//valide user with jwt token
router.use(ctrlAuth.validateappuser)

router.use("/flight", flight);
router.use("/price", price);
module.exports = router;