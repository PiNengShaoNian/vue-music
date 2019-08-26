<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref='searchBox' @query='handleQueryChange'></search-box>
    </div>
    <div ref='shortcutWrapper' v-show='!query' class="shortcut-wrapper">
      <scroll ref='shortcut' :refreshDelay='refreshDelay' class="shortcut" :data='shortcut'>
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" v-for='item in hotkey' class="item" :key="item.k">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show='searchHistory.length'>
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete='deleteSearchHistory' :searches='searchHistory' @select='addQuery'></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" ref='searchResult' v-show='query'>
      <suggest ref='suggest'  @listScroll='blurInput' @select='saveQuery' :query='query'></suggest>
    </div>
    <confirm @confirm='clearSearchHistory' ref='confirm' text='是否要清空所有搜索历史' confirmBtnText='清空'></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box.vue'
import Scroll from 'base/scroll/scroll.vue'
import SearchList from 'base/search-list/search-list.vue'
import Suggest from 'components/suggest/suggest.vue'
import Confirm from 'base/confirm/confirm.vue'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import { mapActions } from 'vuex';
import {playlistMixin, searchMixin} from 'common/js/mixin'

export default {
  name: "Search",
  mixins: [playlistMixin, searchMixin],
  components: {
    SearchBox,
    Scroll,
    Suggest,
    SearchList,
    Confirm
  },
  data () {
    return {
      hotkey: [],
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    shortcut () {
      return this.hotkey.concat(this.searchHistory)
    }
  },
  created () {
    this._getHotKey()
  },
  watch: {
    query(val) {
      if(!val) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()

      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    _getHotKey() {
      getHotKey().then(res => {
        if(res.code === ERR_OK) {
          this.hotkey = res.data.hotkey.slice(10)
        }
      })
    },
    ...mapActions([
      'clearSearchHistory',
    ])
  },
};
</script>

<style lang="stylus" scoped>
 @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>