import { mapGetters, mapMutations, mapActions } from 'vuex'
import { shuffle } from 'common/js/utils'
import { playMode } from "common/js/config";

export const playlistMixin = {
    computed: {
        ...mapGetters([
            "playlist"
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method')
        },
    },
}

export const playerMixin = {
    computed: {
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            "playlist",
            "currentIndex",
            "currentSong",
            "mode",
            "sequenceList",
            'favoriteList'
        ])
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3;
            this.setPlayMode(mode);
            let list = null;
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList);
            } else list = this.sequenceList;
            this.resetCurrentIndex(list);
            this.setPlaylist(list);
        },
        resetCurrentIndex(list) {
            let index = list.findIndex(item => {
                return item.id === this.currentSong.id;
            });
            this.setCurrentIndex(index);
        },
        isFavorite(song) {
            const index = this.favoriteList.findIndex(item => {
                return item.id === song.id
            })
            return index > - 1
        },
        getFavoriteIcon(song) {
            if(this.isFavorite(song)) return 'icon-favorite'
            else return 'icon-not-favorite'
        },
        toggleFavorite(song) {
            if(this.isFavorite(song)) this.deleteFavoriteList(song)
            else this.saveFavoriteList(song)
        },
        ...mapMutations({
            setPlayMode: 'SET_PLAY_MODE',
            setPlaylist: 'SET_PLAYLIST',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayState: 'SET_PLAYING_STATE'
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ])
    },
}

export const searchMixin = {
    data() {
        return {
            query: '',
            refreshDelay: 120
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ])
    },
    methods: {
        handleQueryChange(query) {
            this.query = query
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        blurInput() {
            this.$refs.searchBox.blur()
        },
        saveQuery() {
            this.setSearchHistory(this.query)
        },
        ...mapActions([
            'setSearchHistory',
            'deleteSearchHistory'
        ])
    }
}