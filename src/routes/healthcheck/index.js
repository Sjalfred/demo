const router = require("express").Router();
router.get("", (req, res) => {
  res.json({
    message: "Success"
  })
})
module.exports = router;
