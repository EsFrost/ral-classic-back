const ralClassic = require('../data/ral_classic.json')
const ralHue = require('../data/ral_hue.json')

exports.getAllColors = () => {
  return ralClassic
}

exports.searchColors = (query) => {
  query = query.toLowerCase()
  return ralClassic.filter(color => {
    return (
      color.RAL.toLowerCase().includes(query) ||
      color.RGB.toLowerCase().includes(query) ||
      color.HEX.toLowerCase().includes(query) ||
      color.CMYK.toLowerCase().includes(query) ||
      color.LRV.toString().includes(query) ||
      color.English.toLowerCase().includes(query) ||
      color.German.toLowerCase().includes(query) ||
      color.French.toLowerCase().includes(query) ||
      color.Spanish.toLowerCase().includes(query) ||
      color.Italian.toLowerCase().includes(query) ||
      color.Dutch.toLowerCase().includes(query)
    )
  })
}

exports.getColorsByHue = (hue) => {
  const hueColors = ralHue[hue.toLowerCase()]
  if (!hueColors) {
    return []
  }
  return hueColors.colors.map(ralCode => 
    ralClassic.find(color => color.RAL === ralCode)
  ).filter(Boolean)
}