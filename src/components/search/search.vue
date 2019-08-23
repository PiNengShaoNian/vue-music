<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref='searchBox'></search-box>
    </div>
    <div ref='shortcutWrapper' class="shortcut-wrapper">
      <scroll class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" v-for='item in hotkey' class="item" :key="item.k">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box.vue'
import Scroll from 'base/scroll/scroll.vue'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'

export default {
  name: "Search",
  components: {
    SearchBox,
    Scroll
  },
  data () {
    return {
      hotkey: []
    }
  },
  created () {
    this._getHotKey()
  },
  methods: {
    _getHotKey() {
      getHotKey().then(res => {
        if(res.code === ERR_OK) {
          this.hotkey = res.data.hotkey.slice(10)
        }
      })
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    }
  },
};
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

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
            padding: 2px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
</style>