const router = require("express").Router();
const ctrlFlights = require('../../lib/getflightdetails');

router.get("/:date/:org/:dest/", (req, res) => {
  ctrlFlights.getflightnumber(req,res);
})

module.exports = router;
