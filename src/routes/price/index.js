const router = require("express").Router();
const ctrlPrice = require('../../lib/getprice');

router.get("/:date/:flightnumber", (req, res) => {
    ctrlPrice.getflightprice(req,res);
})

module.exports = router;
