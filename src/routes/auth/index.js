const router = require("express").Router();
const ctrlAuth = require('../../lib/auth');

router.post("", (req, res) => {
    ctrlAuth.authappuser(req, res);
})

router.get("/healthcheck", (req, res) => {
    res.json({
        message: "Success"
    })
})
module.exports = router;
