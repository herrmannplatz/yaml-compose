const fs = require('fs')
const path = require('path')

const merge = require('deepmerge')
const yaml = require('js-yaml')

const arrayify = arr => Array.isArray(arr) ? arr : [arr]

const readFile = src => fs.readFileSync(src, 'utf-8')

const loadYaml = str => yaml.safeLoad(str)

const mapToSourcePath = sourceDir => p => path.resolve(sourceDir, p)

const build = (source) => {
  if (typeof source !== 'string') {
    throw new TypeError(`Expected source to be of type string`)
  }

  const yamlString = readFile(source)
  const yamlJSON = loadYaml(yamlString)

  if (!yamlJSON.include) {
    return yamlString
  }

  const sourceDir = path.dirname(source)

  // no nested includes
  const includes = arrayify(yamlJSON.include)
    .map(mapToSourcePath(sourceDir))
    .map(readFile)
    .map(loadYaml)

  // delete include directive
  delete yamlJSON.include

  const merged = merge.all([yamlJSON, ...includes])

  return yaml.safeDump(merged)
}

module.exports = {
  build
}
