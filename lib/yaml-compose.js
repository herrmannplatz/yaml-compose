const fs = require('fs')
const path = require('path')

const merge = require('deepmerge')
const yaml = require('js-yaml')

const arrayify = arr => Array.isArray(arr) ? arr : [arr]

const readFile = src => fs.readFileSync(src, 'utf-8')

const loadYaml = str => yaml.safeLoad(str)

const mapToSourcePath = (sourcePath, includePath) => path.resolve(path.dirname(sourcePath), includePath)

const build = async (
  source,
  { getFile = readFile, resolvePath = mapToSourcePath } = {}
) => {
  if (typeof source !== 'string') {
    throw new TypeError(`Expected source to be of type string`)
  }

  const yamlString = await getFile(source)
  const yamlJSON = loadYaml(yamlString)

  if (!yamlJSON.include) {
    return yamlString
  }

  // no nested includes
  const absolutePaths = arrayify(yamlJSON.include)
    .map(includePath => resolvePath(source, includePath))
  const files = await Promise.all(absolutePaths.map(getFile))
  const includes = files.map(loadYaml)

  // delete include directive
  delete yamlJSON.include

  const merged = merge.all([yamlJSON, ...includes])

  return yaml.safeDump(merged)
}

module.exports = {
  build
}
