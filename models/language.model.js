const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
  languageName: {
    type: String,
    require: true,
  },
});

const languageModel = mongoose.model("language", languageSchema);
module.exports = languageModel;
