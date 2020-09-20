const mongoose = require("mongoose")

let tagsSchema = new mongoose.Schema({
    name: String
});

let projectSchema = new mongoose.Schema({
    name: String,
    link: String,
    color1: String,
    color2: String,
    image_location: String,
    description: String,
    tags: [tagsSchema],
});

let portfolioSchema = new mongoose.Schema({
    name: String,
    projects: [projectSchema],
});

module.exports = mongoose.model("portfolio", portfolioSchema);