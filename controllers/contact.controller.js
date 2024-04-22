const apiRoutes = require("../helper/apiRoute");
const {
  responseStatusCode,
  responseStatusText,
} = require("../helper/responseHelper");
const contactModel = require("../models/contact.model");
const { addContactValidation } = require("../validations/contact.validation");

// Add contact information by User
exports.addContactInformation = async (req, res) => {
  try {
    const { error, value } = addContactValidation.validate(req.body);
    if (error) {
      return res.status(responseStatusCode.FORBIDDEN).json({
        status: responseStatusText.ERROR,
        message: error.details[0].message,
      });
    }
    await contactModel.create(value);
    return res.status(responseStatusCode.SUCCESS).json({
      status: responseStatusText.SUCCESS,
      message: "Contact information added successfully",
    });
  } catch (error) {
    console.log("🚀 ~ exports.addContactInformation= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};

// Get all contact information by Admin
exports.getContactInformation = async (req, res) => {
  try {
    const contactQueryData = await contactModel.find().select("-__v");
    const currentPage = apiRoutes.CONTACT_LIST;
    return res.render("contactList", { contactQueryData, currentPage });
    // return res.status(responseStatusCode.SUCCESS).json({
    //   status: responseStatusText.SUCCESS,
    //   message: "Contact information fetched successfully",
    //   contactQueryData,
    // });
  } catch (error) {
    console.log("🚀 ~ exports.getContactInformation= ~ error:", error);
    return res.status(responseStatusCode.INTERNAL_SERVER).json({
      status: responseStatusText.ERROR,
      message: error.message,
    });
  }
};
