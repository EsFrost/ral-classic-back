const express = require('express')
const colorController = require('../controllers/colorController')

const router = express.Router()

router.get('/colors', colorController.getAllColors)
router.get('/colors/search', colorController.searchColors)
router.get('/colors/hue/:hue', colorController.getColorsByHue)

module.exports = router