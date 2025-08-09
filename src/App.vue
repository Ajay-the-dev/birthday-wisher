<template>
  <router-view />
  <BottomNavBar />
</template>

<script setup>
import BottomNavBar from './components/BottomNavBar.vue'
</script>

<style>
/* Add bottom padding so content is not hidden behind nav */
body, #app {
  margin: 0; padding: 0; height: 100%;
}

#app {
  padding-bottom: 60px; /* height of bottom nav + some spacing */
}
</style>
