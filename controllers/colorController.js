const colorService = require('../services/colorService')

exports.getAllColors = (req, res) => {
  const colors = colorService.getAllColors()
  res.json(colors)
}

exports.searchColors = (req, res) => {
  const { query } = req.query
  const results = colorService.searchColors(query)
  res.json(results)
}

exports.getColorsByHue = (req, res) => {
  const { hue } = req.params
  const colors = colorService.getColorsByHue(hue)
  res.json(colors)
}