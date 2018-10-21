#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const meow = require('meow')
const { build } = require('./lib/yaml-compose')

const cli = meow(`
  Usage
    $ yaml-compose <source>

  Options
    --output, -o Output directory

  Examples
    $ yaml-compose source
    $ yaml-compose source -o dist
`)

const source = cli.input[0]
const distDir = cli.flags.o || ''

if (!source) {
  console.log('Missing source')
  process.exit(1)
}

try {
  const yaml = build(source)

  if (distDir && !fs.existsSync(distDir)) {
    fs.mkdirSync(distDir)
  }

  fs.writeFileSync(path.join(process.cwd(), distDir, path.basename(source)), yaml)
} catch (err) {
  console.log('Failed to compose YAML file', err.message)
  process.exit(1)
}
