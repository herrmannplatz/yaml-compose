# yaml-compose

[![npm version](https://badge.fury.io/js/yaml-compose.svg)](https://badge.fury.io/js/yaml-compose) [![Build Status](https://travis-ci.org/herrmannplatz/yaml-compose.svg?branch=master)](https://travis-ci.org/herrmannplatz/yaml-compose)

> Gitlab influenced way of composing yaml files by using the `include` keyword

## Usage via CLI

Install package globally.
```
$ npm install yaml-compose -g
```

Given that you have the following yaml files.
```
// Content of source.yml

include: "./include.yml"

variableA: "a"

// Content of include.yml

variableB: "b"
```

You can use the following command to compose the yaml file.
```
$ yaml-compose source.yaml -o dist

// Content of dist/source.yml

variableA: "a"
variableB: "b"
```

Alternativly you can also use npx and not install it globally.
```
$ npx yaml-compose source.yaml -o dist
```

## Usage as a module

Example:
```
const { build: yamlCompose } = require('yaml-compose')
const yaml = await build('source.yml' )
```

The build function has two arguments `build(sourceFile, options)`:
-`sourceFile`: The path to the source file
- `options`: An options object with two recognized properties:
    - `getFile`: An async function used to read yaml files (i.e. the original source and all included files)  
      Defaults to `src => fs.readFileSync(src, 'utf-8')`
    - `resolvePath`: Function used to resolve the relative path given for includes in the source file.   
      Defaults to `(sourcePath, includePath) => path.resolve(path.dirname(sourcePath), includePath)`  
