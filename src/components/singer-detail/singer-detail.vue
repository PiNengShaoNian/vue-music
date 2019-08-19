<template>
    <transition name='slide'>
        <music-list :title='title' :bg-image='bgImage' :songs='songs'></music-list>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { getSongUrl }  from 'api/song'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
    name: 'singer-detail',
    components: {
        MusicList
    },
    data () {
        return {
            songs: []
        }
    },
    computed: {
        title () {
            return this.singer.name
        },
        bgImage() {
            return this.singer.avatar
        },
        ...mapGetters([
            'singer'
        ])
    },
    created () {
        this._getDetail()
    },
    methods: {
        _getDetail() {
            if(!this.singer.id) return this.$router.push('/singer')

            getSingerDetail(this.singer.id)
            .then(res => {
                if(res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list)
                }
            })
        },
        _normalizeSongs (list) {
            let ret = []
            list.forEach(item => {
                let { musicData } = item
                if(musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    }
}
</script>
<style lang="stylus" scoped>
  .singer-detail
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 2
    background: #000
</style>