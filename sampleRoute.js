const express = require("express");
const router = express.Router();


router.get(
    "/:id", function (req, res) {
        res.json({ a: 'sample route' });
    });


module.exports = router;