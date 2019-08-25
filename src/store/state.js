import { playMode } from 'common/js/config'
import { loadSearch } from 'common/js/cache'

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    currentIndex: -1,
    mode: playMode.sequence,
    disc: {},
    toplist: [],
    searchHistory: loadSearch()
}

export default state