# yaml-compose

[![npm version](https://badge.fury.io/js/yaml-compose.svg)](https://badge.fury.io/js/yaml-compose) [![Build Status](https://travis-ci.org/herrmannplatz/yaml-compose.svg?branch=master)](https://travis-ci.org/herrmannplatz/yaml-compose)

> Gitlab influenced way of composing yaml files by using the `include` keyword

## Usage

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
yaml-compose source.yaml -o dist

// Content of dist/source.yml
variableA: "a"
variableB: "b"
```

Alternativly you can also use npx and not install it globally.
```
npx yaml-compose source.yaml -o dist
```
