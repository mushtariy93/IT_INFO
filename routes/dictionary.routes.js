const express=require('express');
const { addTerm, getDictionary, deleteTermByID, updateTermById, getTermsByLetter, getTermsByTerm, getTermByQuery } = require('../controllers/dictionary.controllers');



const router =express.Router();

router.post("/create",addTerm);
router.get("/",getDictionary);
router.get("/letter/:letter",getTermsByLetter)
router.get("/term/:term",getTermsByTerm);
router.get("/query/search",getTermByQuery);
router.patch("/:id", updateTermById); 
router.delete("/:id",deleteTermByID);



module.exports=router;