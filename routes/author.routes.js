const express = require("express");
const { addAuthor, getAuthors, updateAuthorById, deleteAuthorById } = require("../controllers/author.controller");
const router = express.Router();

router.post("/create", addAuthor);
router.get("/", getAuthors);
router.patch("/update/:id", updateAuthorById);
router.delete("/delete/:id", deleteAuthorById);

module.exports = router;
