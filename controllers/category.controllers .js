const { errorHandler } = require("../helpers/error_handler");
const Category = require("../schemas/Category");


const addCategory = async (req, res) => {
  try {
    const { category_name, parent_category_id } = req.body;
    const newCategory = new Category({
      category_name,
      parent_category_id,
    });
    await newCategory.save();
    res
      .status(201)
      .send({ message: "category created successfully", data: newCategory });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await category
      .find()
      .populate("parent_category_id", "category_name");
    res.status(200).send({ data: categories });
  } catch (error) {
    errorHandler(res, error);
  }
};


const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name,parent_category_id} = req.body;
    const updated_category = await Category.findByIdAndUpdate(
      id,
      { category_name, parent_category_id },
      { new: true, runValidators: true }
    );
    if (!updated_category) {
      return res.status(404).send({
        statusCode: 404,
        message: "Category not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Category updated successfully",
      data: updated_category,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};





const deleteCategoryByID = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_category = await Category.findByIdAndDelete(id);
    if (!deleted_category) {
      return res.status(404).send({
        statusCode: 404,
        message: "Category not found",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "Category deleted successfully",
      data: deleted_category,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCategoryByName=async (req,res)=>{
    try {
        const { category_name } = req.params;
        const terms = await Dictionary.find({ letter });
        res.send(terms);
    } catch (error) {
        errorHandler(res, error);
    };
};



module.exports = {
  addCategory,
  updateCategoryById,
  getCategory,
  deleteCategoryByID,
  getCategoryByName,
};
