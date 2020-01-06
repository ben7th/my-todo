const Router = require('url-router')
const util = require('util')
const { getJsonBody, respJSON } = require('ben7th-fc-utils')

const OSSStore = require('./lib/OSSStore')
const TODO_KEY = 'my-todo/ben7th.json'
const store = new OSSStore({ ossKey: TODO_KEY })

const router = new Router([
  // POST
  ['/saveTODO', async ({ req, resp, route }) => {
    let { body } = await getJsonBody({ req, resp })
    let { data } = body
    await store.save({ object: data })
    return { status: "saved", data }
  }],

  // GET, POST
  ['/loadTODO', async ({ req, resp, route }) => {
    let data = await store.load()
    return { status: "loaded", data }
  }],
])

module.exports.handler = (req, resp, context) => {
  // let params = {
  //   path: req.path,
  //   queries: req.queries,
  //   headers: req.headers,
  //   method : req.method,
  //   requestURI : req.url,
  //   clientIP : req.clientIP,
  // }

  let route = router.find(req.path)

  if (route) {
    route.handler({ req, resp, route })
      .then(data => respJSON(resp, { data }))
      .catch(e => respJSON(resp, { error: util.inspect(e).split(`\n`) }))
    return
  }

  respJSON(resp, { error: 'no such API PATH', path: req.path })
}