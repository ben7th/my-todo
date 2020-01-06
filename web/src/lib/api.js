// https://1246105.cn-shenzhen.fc.aliyuncs.com/2016-08-15/proxy/ben7th-my-todo/api/

const ALI_ID = '1246105'
const REGION = 'cn-shenzhen'
const RESOURCE = 'ben7th-my-todo'
const FUNC = 'api'

const ENDPOINT = `https://${ALI_ID}.${REGION}.fc.aliyuncs.com/2016-08-15/proxy/${RESOURCE}/${FUNC}`

// const GET = async ({ path }) => {
//   let url = `${ ENDPOINT }${ path }`
//   let res = await fetch(url)
//   let data = await res.json()
//   return data.mapdata
// }

const POST = async (path, data) => {
  let url = `${ ENDPOINT }${ path }`
  let res = await fetch(url, { 
    method: 'POST',
    body: JSON.stringify(data)
  })
  let jsonData = await res.json()
  return jsonData.data
}

const api = {
  async save ({ data }) {
    let res = await POST('/saveTODO', { data })
    return res.data
  },

  async load () {
    let res = await POST('/loadTODO')
    return res.data
  }
}

export default api