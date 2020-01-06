const Router = require('url-router')

const jsonBody = require('body/json')
const getBody = ({ req, resp }) => {
  return new Promise(resolve => {
    jsonBody(req, resp, (err, body) => {
      resolve({ err, body })
    })
  })
}

module.exports = new Router([
  // 为当前用户创建一个新的分享 ID
  ['POST', '/foo', async ({ req, resp, route }) => {
    let { body } = await getBody({ req, resp })
    if (!body) {
      return { error: 'no body data' }
    }
    return { abc: 123 }
  }],

  ['GET', '/bar', async ({ req, resp, route }) => {
    let { queries } = req
    return { queries }
  }],
])
