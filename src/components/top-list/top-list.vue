<template>
    <transition name='slide'>
        <music-list
          :rank='rank'
           :title='title' :songs='songs' :bg-image='bgImage'></music-list>
    </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { getMusicList } from 'api/rank'
import { createSong } from 'common/js/song'

export default {
    name: 'toplist',
    components: {
        MusicList
    },
    data () {
        return {
            songs: [],
            rank: true
        }
    },
    computed: {
        title () {
            return this.toplist.topTitle
        },
        bgImage() {
            if(this.songs.length) {
                return this.songs[0].image
            }
            return ''
        },
        ...mapGetters([
            'toplist'
        ])
    },
    created () {
        this._getMusicList()
    },
    methods: {
        _getMusicList() {
            if(!this.toplist.id) return this.$router.push('/rank')

            getMusicList(this.toplist.id)
            .then(res => {
                if(res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.songlist)
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach(item => {
                const musicData = item.data
                if(musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })

            return ret
        }
    },
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave-to
    transform: translateX(100%)
</style>