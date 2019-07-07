var mongoose = require("mongoose");
var noticesSchema = require("../schemas/notice");

module.exports = mongoose.model("Notice", noticesSchema);
