const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/list", UserController.getAllUsers); 

router.get("/:id", UserController.getUserById, async (req, res) => {
    try {
        const user = req.user; 

        return res.status(200).json({
            user,
            message: "User fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}); 

module.exports = router;