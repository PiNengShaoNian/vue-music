<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view />
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from "./components/m-header/m-header";
import Tab from "./components/tab/tab.vue";
import Player from './components/player/player.vue'

export default {
  name: "App",
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style>
</style>

