const { Schema, model } = require("mongoose");
const authorSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
    },
    nick_name: {
      type: String,
      minlength: 5,
      maxlength: 16,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please enter a valid email address",],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20,
    },
    info: {
      type: String,
      trim: true
    },
    position: {
      type: String,
      trim: true
    },
    photo: {
      type: String,
      trim: true
    },
    is_expert: {
      type: Boolean,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true
    },
  },

  {
    versionKey: false,
  }
);

module.exports = model("Author", authorSchema);
