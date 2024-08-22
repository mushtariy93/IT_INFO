const express = require("express");
const { addDescription, getDescriptions, updateDescriptionById, deleteDescriptionById } = require("../controllers/description.controllers");
const router = express.Router();

router.post("/create", addDescription);
router.get("/", getDescriptions);
router.patch("/update/:id", updateDescriptionById);
router.delete("/delete/:id", deleteDescriptionById);

module.exports = router;
