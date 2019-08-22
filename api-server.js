const express = require('express')
const axios = require('axios')
const apiRoutes = express.Router()
const app = express()

apiRoutes.get('/getDiscList', (req, res) => {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getSongVkey', (req, res) => {
  const url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg`

  axios
    .get(url, {
      params: req.query
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  })
    .then(response => {
      var ret = response.data
      if (typeof ret === 'string') {
        var reg = /^\w+\(({[^()]+})\)$/
        var matches = ret.match(reg)
        if (matches) ret = JSON.parse(matches[1])
      }
      res.json(ret)
    })
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/getSongList', function (req, res) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      const jsonCallback = (data) => {
        ret = data
      }
      eval(response.data)
      res.json(ret)
    })
    .catch(e => {
      console.log(e)
    })
})

app.use('/api', apiRoutes)

app.listen(3000)