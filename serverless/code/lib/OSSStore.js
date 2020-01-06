const config = require('./config.json')
const OSS = require('ali-oss')

class OSSStore {
  constructor ({ ossKey, defaultData }) {
    this.ossKey = ossKey
    this.ossClient = new OSS(config)
    this.defaultData = defaultData || {}
  }

  async save ({ object }) {
    await this.ossClient.put(this.ossKey, new Buffer(JSON.stringify(object)))
  }

  async load () {
    try {
      let res = await this.ossClient.get(this.ossKey)
      return JSON.parse(res.content.toString())
    } catch (e) {
      if (e.name === 'NoSuchKeyError') {
        return this.defaultData || {}
      }
      throw e
    }
  }
}

module.exports = OSSStore