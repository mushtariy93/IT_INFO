const express=require('express');
const { addCategory, updateCategoryById, getCategory, deleteategoryByID, deleteCategoryByID } = require('../controllers/Category.controllers ');



const router =express.Router();

router.post("/create", addCategory);
router.get("/",getCategory);

router.patch("/cat/:id", updateCategoryById);
router.delete("/:id", deleteCategoryByID);






module.exports=router;