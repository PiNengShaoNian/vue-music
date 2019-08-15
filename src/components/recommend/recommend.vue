<template>
  <div class="recommend" ref="recommend">
    <div v-if="recommends.length" class="slider-wrapper">
      <slider>
        <div v-for="item in recommends" :key="item.id">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" class="needsclick" alt />
          </a>
        </div>
      </slider>
    </div>
  </div>
</template>

<script>
import { getRecommend } from "api/recommend";
import { ERR_OK } from "api/config";
import Slider from "base/slider/slider";

export default {
  name: "Recommend",
  components: {
    Slider
  },
  data() {
    return {
      recommends: []
    };
  },
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .recommend
    .slider-wrapper
      overflow: hidden
      
</style>
