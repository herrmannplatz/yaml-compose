/* eslint-env jest */
const path = require('path')
const { build } = require('../yaml-compose')

const fixturePath = path.join(__dirname, 'fixtures')

describe('build', () => {
  it('should throw error if source is missing', async () => {
    expect(build()).rejects.toThrow(/TypeError/)
  })

  it('should handle files without includes', async () => {
    const singleFilePath = path.join(fixturePath, 'no-include', 'source.yml')
    expect(await build(singleFilePath)).toMatchSnapshot()
  })

  it('should include single file', async () => {
    const singleFilePath = path.join(fixturePath, 'single-include', 'source.yml')
    expect(await build(singleFilePath)).toMatchSnapshot()
  })

  it('should include multiple file', async () => {
    const singleFilePath = path.join(fixturePath, 'array-include', 'source.yml')
    expect(await build(singleFilePath)).toMatchSnapshot()
  })
})
