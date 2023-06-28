const express = require('express');
const {getCategory} = require("../services/CategoryServices");
const router = express.Router();

router.post('/',getCategory)

module.exports= router