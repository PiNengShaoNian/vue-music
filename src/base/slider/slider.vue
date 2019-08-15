<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        :class="{active: currentPageIndex === index }"
        v-for="(item, index) in dots"
        :key="index"
      ></span>
    </div>
  </div>
</template>

<script>
import { addClass } from "common/js/dom";
import BScroll from "better-scroll";
import { setTimeout } from "timers";

export default {
  name: "slider",
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  mounted() {
    setTimeout(() => {
      this._setSilderWidth();
      this._initDots();
      this._initSlider();

      if (this.autoPlay) this._play();
    }, 20);
  },
  methods: {
    _setSilderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;

      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");

        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }

      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      });

      window.slider = this.slider;

      this.slider.on("scrollEnd", () => {
        if (this.autoPlay) this._play();
      });

      this.slider.on("beforeScrollStart", () => {
        const pageIndex = this.slider.getCurrentPage().pageX;
        this.currentPageIndex = pageIndex > 5 ? 0 : pageIndex - 1;
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      });
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const pageIndex = this.slider.getCurrentPage().pageX + 1;
        this.slider.goToPage(pageIndex, 0, 400);
        this.currentPageIndex = pageIndex > 5 ? 0 : pageIndex - 1;
      }, this.interval);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.slider {
  min-height: 1px;
  position: relative;

  .slider-group {
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      img {
        display: block;
        width: 100%;
      }

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>