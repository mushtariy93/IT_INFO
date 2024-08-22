const { errorHandler } = require("../helpers/error_handler");
const Dictionary = require("../schemas/Dictionary");


const addTerm=async(req,res)=>{
    try {
        const { term }=req.body;
        const dict=await Dictionary.findOne({term:new RegExp(term,"i")});
        if(dict){
            return res
            .status(400)
            .send({error:"Bu termin bazada mavjud"});
        }
        const newDictionary=await Dictionary.create({
          term,
          letter:term[0],
        });

        res.status(201).send({message:"Yangi terim qo`shildi",newDictionary,});
      
    } catch (error) {
        errorHandler(res,error);
    }
}


const getDictionary = async (req, res) => {
  try {
    const dictionary = await Dictionary.find();
    res.send(dictionary);
  } catch (error) {
    errorHandler(res, error);
  }
};


const updateTermById = async (req, res) => {
  try {
    const { id } = req.params;
    const { term } = req.body;
    const updated_term = await Dictionary.findByIdAndUpdate(
      id,
      { term, letter: term.charAt(0).toUpperCase() },
      { new: true, runValidators: true }
    );
    if (!updated_term) {
      return res.status(404).send({
        statusCode: 404,
        message: "Dictionary not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Term updated successfully",
      data: updated_term,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};





const deleteTermByID= async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_term = await Dictionary.findByIdAndDelete(id);
    if (!deleted_term) {
      return res.status(404).send({
        statusCode: 404,
        message: "Term not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Term deleted successfully",
      data: deleted_term,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTermsByLetter=async (req,res)=>{
    try {
        const { letter } = req.params;
        const terms = await Dictionary.find({ letter });
        res.send(terms);
    } catch (error) {
        errorHandler(res, error);
    };
}

const getTermsByTerm=async (req, res)=>{
    try {
        const { term } = req.params;
        const terms = await Dictionary.find({ term:term});
        if (!Dictionary.length){
            return res.status(404).send({
                statusCode: 404,
                message: "No terms found",
            });  
        }
        res.send(terms);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getTermByQuery=async (req,res)=>{
        try {
            const { term } = req.query;
            const terms = term ? {term :{$regex:term ,$options:"i"}} :{};
           const Dics =await Dictionary.find(terms);
            res.send(Dics);
        } catch (error) {
            errorHandler(res, error);
        }
    };

module.exports = {
  addTerm,
  getDictionary,
  updateTermById,
  deleteTermByID,
  getTermsByLetter,
  getTermsByTerm,
  getTermByQuery,
};
