const { errorHandler } = require("../helpers/error_handler");
const Synonym = require("../schemas/synonym");

const addSynonym = async (req, res) => {
  try {
    const { desc_id, dict_id } = req.body;
    const newSynonym = await Synonym.create({
      desc_id,
      dict_id,
    });
    res
      .status(201)
      .send({ message: "New Synonym added successfully!", newSynonym });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getSynonyms = async (req, res) => {
  try {
    const Categories = await Synonym.find().populate("desc_id", "description").populate("dict_id","term");
    res.send(Categories);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateSynonymById = async (req, res) => {
  try {
    const { id } = req.params;
    const { desc_id, dict_id } = req.body;
    const updated_Synonym = await Synonym.findByIdAndUpdate(
      id,
      { desc_id, dict_id },
      { new: true, runValidators: true }
    );
    if (!updated_Synonym) {
      res
        .status(404)
        .send({ statuscode: 404, message: "Synonym not found!" });
    }
    return res.status(200).send({
      statuscode: 200,
      message: "Synonym updated successfully!",
      data: updated_Synonym,
    });
  } catch (error) {
    console.log(res, error);
  }
};

const deleteSynonymById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_Synonym = await Synonym.findByIdAndDelete(id);
    if (!deleted_Synonym) {
      res
        .status(404)
        .send({ statuscode: 404, message: "Synonym not found!" });
    }
    res.status(200).send({
      statuscode: 200,
      message: "Synonym deleted successfully!",
      data: deleted_Synonym,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addSynonym,
  getSynonyms,
  updateSynonymById,
  deleteSynonymById,
};
