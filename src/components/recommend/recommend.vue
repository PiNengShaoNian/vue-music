<template>
  <div>推荐</div>
</template>

<script>
import { getRecommend } from 'api/recommend'

export default {
  name: "Recommend",
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend()
      .then(res => {
        // debugger
      })
    }
  }
};
</script>
