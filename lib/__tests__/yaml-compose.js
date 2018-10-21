/* eslint-env jest */
const path = require('path')
const { build } = require('../yaml-compose')

const fixturePath = path.join(__dirname, 'fixtures')

describe('build', () => {
  it('should throw error if source is missing', () => {
    expect(() => build()).toThrowError()
  })

  it('should handle files without includes', () => {
    const singleFilePath = path.join(fixturePath, 'no-include', 'source.yml')
    expect(build(singleFilePath)).toMatchSnapshot()
  })

  it('should include single file', () => {
    const singleFilePath = path.join(fixturePath, 'single-include', 'source.yml')
    expect(build(singleFilePath)).toMatchSnapshot()
  })

  it('should include multiple file', () => {
    const singleFilePath = path.join(fixturePath, 'array-include', 'source.yml')
    expect(build(singleFilePath)).toMatchSnapshot()
  })
})
