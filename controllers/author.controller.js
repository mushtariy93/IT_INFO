const { errorHandler } = require("../helpers/error_handler");
const Author = require("../schemas/author");

const addAuthor = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      nick_name,
      email,
      phone,
      password,
      info,
      position,
      photo,
      is_expert,
      is_active,
    } = req.body;
    const newAuthor = await Author.create({
      first_name,
      last_name,
      nick_name,
      email,
      phone,
      password,
      info,
      position,
      photo,
      is_expert,
      is_active,
    });
    res
      .status(201)
      .send({ message: "New Author added successfully!", newAuthor });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAuthors = async (req, res) => {
  try {
    const Authors = await Author.find();
    res.send(Authors);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      nick_name,
      email,
      phone,
      password,
      info,
      position,
      photo,
      is_expert,
      is_active,
    } = req.body;
    const updated_Author = await Author.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        nick_name,
        email,
        phone,
        password,
        info,
        position,
        photo,
        is_expert,
        is_active,
      },
      { new: true, runValidators: true }
    );
    if (!updated_Author) {
      res.status(404).send({ statuscode: 404, message: "Author not found!" });
    }
    return res.status(200).send({
      statuscode: 200,
      message: "Author updated successfully!",
      data: updated_Author,
    });
  } catch (error) {
    console.log(res, error);
  }
};

const deleteAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_Author = await Author.findByIdAndDelete(id);
    if (!deleted_Author) {
      res.status(404).send({ statuscode: 404, message: "Author not found!" });
    }
    res.status(200).send({
      statuscode: 200,
      message: "Author deleted successfully!",
      data: deleted_Author,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAuthor,
  getAuthors,
  updateAuthorById,
  deleteAuthorById
};
