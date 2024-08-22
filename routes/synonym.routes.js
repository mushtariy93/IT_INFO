const express = require("express");
const { addSynonym, getSynonyms, updateSynonymById, deleteSynonymById } = require("../controllers/synonym.controllers");
const router = express.Router();

router.post("/create", addSynonym);
router.get("/", getSynonyms);
router.patch("/update/:id", updateSynonymById);
router.delete("/delete/:id", deleteSynonymById);

module.exports = router;
