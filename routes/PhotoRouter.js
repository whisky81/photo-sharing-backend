const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();

// router.post("/", async (request, response) => {
  
// });

router.get("/list", async (req, res) => {
    const photos = await Photo.find({});
    return res.json({
        photos
    });
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

    const photo = await Photo.findById(id).populate('user_id').populate('comments.user');

    return res.json(photo); 

});

module.exports = router;
