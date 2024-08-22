const { errorHandler } = require("../helpers/error_handler");
const Description = require("../schemas/description");

const addDescription = async (req, res) => {
  try {
    const { category_id, description } = req.body;
    const newDescription = await Description.create({
      category_id, description,
    });
    res
      .status(201)
      .send({ message: "New Description added successfully!", newDescription });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescriptions = async (req, res) => {
  try {
    const Categories = await Description.find().populate("category_id", "category_name");
    res.send(Categories);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateDescriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, description } = req.body;
    const updated_Description = await Description.findByIdAndUpdate(id, 
        {category_id, description},
    { new: true, runValidators: true }
    );
    if (!updated_Description) {
      res.status(404).send({ statuscode: 404, message: "Description not found!" });
    }
    return res.status(200).send({
      statuscode: 200,
      message: "Description updated successfully!",
      data: updated_Description,
    });
  } 
  catch (error) {
    console.log(res, error);
  }
};

const deleteDescriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_Description = await Description.findByIdAndDelete(id);
    if (!deleted_Description) {
      res.status(404).send({ statuscode: 404, message: "Description not found!" });
    }
    res.status(200).send({
      statuscode: 200,
      message: "Description deleted successfully!",
      data: deleted_Description,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
    addDescription,
    getDescriptions,
    updateDescriptionById,
    deleteDescriptionById
}

