const fs = require('fs')
const path = require('path')

const merge = require('deepmerge')
const yaml = require('js-yaml')

const arrayify = (arr) => Array.isArray(arr) ? arr : [arr]

function build (source) {
  if (typeof source !== 'string') {
    throw new TypeError(`Expected source to be of type string`)
  }

  const yamlString = fs.readFileSync(source, 'utf-8')
  const yamlJSON = yaml.safeLoad(yamlString)

  if (!yamlJSON.include) {
    return yamlString
  }

  const sourceDir = path.dirname(source)

  // no nested includes
  const includes = arrayify(yamlJSON.include).map((includePath) => {
    const includeString = fs.readFileSync(path.resolve(sourceDir, includePath), 'utf-8')
    return yaml.safeLoad(includeString)
  })

  // delete include directive
  delete yamlJSON.include

  const merged = merge.all([yamlJSON, ...includes])

  return yaml.safeDump(merged)
}

module.exports = {
  build
}
