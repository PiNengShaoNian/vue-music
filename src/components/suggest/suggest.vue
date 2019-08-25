<template>
  <scroll
    :beforeScroll="beforeScroll"
    @beforeScroll="listScroll"
    :data="result"
    :pullup="pullup"
    @scrollToEnd="searchMore"
    ref="suggest"
    class="suggest"
  >
    <ul class="suggest-list">
      <li
        @click="selectItem(item)"
        v-for="item in result"
        class="suggest-item"
        :key="item.id || item.singerid"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore"></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/scroll.vue";
import NoResult from "base/no-result/no-result.vue";
import { search } from "api/search";
import { ERR_OK } from "api/config";
import { createSong, filterSinger } from "common/js/song";
import Singer from "common/js/singer";
import Loading from "base/loading/loading.vue";
import { mapMutations, mapActions } from "vuex";
const perpage = 20;

const TYPE_SINGER = "singer";

export default {
  name: "suggest",
  components: {
    Scroll,
    Loading,
    NoResult
  },
  props: {
    showSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      result: [],
      pullup: true,
      hasMore: true,
      beforeScroll: true
    };
  },
  watch: {
    query(newQuery) {
      this.search(newQuery);
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh();
    },
    listScroll() {
      this.$emit("listScroll");
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = Singer({
          id: item.singermid,
          name: item.singername
        });
        this.$router.push({
          path: `/search/${singer.id}`
        });
        this.setSinger(singer);
      } else {
        this.insertSong(item);
      }
      this.$emit("select", item + i);
    },
    _checkMore(data) {
      const song = data.song;
      if (
        !song.list.length ||
        song.curnum + song.curpage * perpage > song.totalnum
      ) {
        this.hasMore = false;
      }
    },
    searchMore() {
      if (!this.hasMore) return;

      this.page++;
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          let ret = [];
          const keys = {};
          this.result
            .slice()
            .concat(this._genResult(res.data))
            .forEach(item => {
              if (!keys[item.id] && !keys[item.singerid]) {
                keys[item.id || item.singerid] = 1;

                ret.push(item);
              }
            });
          this.result = ret;
          this._checkMore(res.data);
        }
      });
    },
    search(query) {
      this.page = 1;
      this.hasMore = true;
      this.$refs.suggest.scrollTo(0, 0);
      search(this.query, 1, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data);
          this._checkMore(res.data);
        }
      });
    },
    _genResult(data) {
      let ret = [];
      if (data.zhida && data.zhida.singerid) {
        ret.push({
          ...data.zhida,
          ...{
            type: TYPE_SINGER
          }
        });
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list));
      }

      return ret;
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });

      return ret;
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return "icon-mine";
      } else return "icon-music";
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        const singernames =
          typeof item.singer === "string"
            ? item.singer
            : filterSinger(item.singer);
        return `${item.name}-${singernames}`;
      }
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    ...mapActions(["insertSong"])
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;

      .icon {
        flex: 0 0 30px;
        width: 30px;

        [class^='icon-'] {
          font-size: 14px;
          color: $color-text-d;
        }
      }

      .name {
        flex: 1;
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>