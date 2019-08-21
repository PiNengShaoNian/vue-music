import { commonParams } from './config'
import axios from 'axios'

function getSongVkey(song) {
    const url = 'api/getSongVkey'

    const params = {
        format: 'json205361747',
        guid: 126548448,
        songmid: song.mid,
        cid: 205361747,
        platform: 'yqq',
        filename: `C400${song.mid}.m4a`
    }

    return axios
        .get(url, {
            params
        })
        .then(res => {
            return res.data
        })
}

export function getSongUrl(song) {
    return getSongVkey(song)
        .then(res => {
            // console.log({
            //     mid: song.mid,
            //     vkey: res.data.items[0].vkey,
            //     filename: `C400${song.mid}.m4a`,
            // })
            return res.data.items[0].vkey ?
                `http://ws.stream.qqmusic.qq.com/C400${song.mid}.m4a?fromtag=0&guid=126548448&vkey=${res.data.items[0].vkey}`
                : ''
        })
}

export function getLyric(mid) {
    const url = '/api/lyric'

    const data = Object.assign({}, commonParams, {
        songmid: mid,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        categoryId: 10000000,
        pcachetime: +new Date(),
        format: 'json'
    })

    return axios
        .get(url, {
            params: data
        })
        .then(res => {
            return res.data
        })
}