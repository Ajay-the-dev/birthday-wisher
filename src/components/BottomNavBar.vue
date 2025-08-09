<template>
  <nav :class="store.isLightMode ? 'bottom-nav':'bottom-nav-dark'">
    <router-link to="/" class="nav-item" :class="{ active: isActive('/') }" v-if="store.isLightMode">
      <i class="bi bi-house-fill"></i>
    </router-link>
    <router-link to="/" class="nav-item-dark" :class="{ active: isActive('/') }" v-else>
      <i class="bi bi-house-fill"></i>
    </router-link>

    <router-link to="/profile" class="nav-item" :class="{ active: isActive('/profile') }" v-if="store.isLightMode">
      <i class="bi bi-person-fill"></i>    
    </router-link>
    <router-link to="/profile" class="nav-item-dark" :class="{ active: isActive('/profile') }" v-else>
      <i class="bi bi-person-fill"></i>    
    </router-link>

    <router-link to="/history" class="nav-item" :class="{ active: isActive('/history') }"  v-if="store.isLightMode">
      <i class="bi bi-clock-history"></i>
    </router-link>
    <router-link to="/history" class="nav-item-dark" :class="{ active: isActive('/history') }"  v-else>
      <i class="bi bi-clock-history"></i>
    </router-link>

    <router-link to="/about" class="nav-item" :class="{ active: isActive('/about') }"  v-if="store.isLightMode">
      <i class="bi bi-heart-fill"></i>
    </router-link>
    <router-link to="/about" class="nav-item-dark" :class="{ active: isActive('/about') }"  v-else>
      <i class="bi bi-heart-fill"></i>
    </router-link>

  </nav>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

import { useCommonStore } from '../stores/common'
const store = useCommonStore()

function isActive(path) {
  return route.path === path
}

onMounted(() => {
  store.isAM() 
})
</script>

<style>
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  background: #eee;
  border-top: 1px solid #ccc;
  justify-content: space-around;
  padding: 1rem 0;
}

.bottom-nav-dark {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  background: #000000;
  border-top: 1px solid #ccc;
  justify-content: space-around;
  padding: 1rem 0;
  
}

.nav-item {
  color: #444;
  text-decoration: none;
  font-weight: 500;
}

.nav-item-dark {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
}

.nav-item.active {
  color: #007bff;
  font-weight: 700;
}

.nav-item-dark.active {
  color: #ffffff;
  font-weight: 700;
  border-bottom: 2px solid #fff;
  border-radius: 2px;
}
</style>
