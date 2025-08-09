<template>
      <!-- <div class="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white"> -->

  <div :class="store.isLightMode ? 'container vh-100 d-flex flex-column justify-content-center align-items-center bg-white text-black':'container vh-100 d-flex flex-column justify-content-center align-items-center bg-black text-white'">
          <!-- <i class="bi bi-lightning-charge-fill me-2"></i> -->
            <fire-work-effect v-if="popperActive"/>
            <div v-if="!popperActive">
                <div class="row">
                  <div class="col-12 bigger">{{ days }}
                      <span class="fs-6">Days</span>
                  </div>
                  <!-- <div class="col-12 bigger">Days</div> -->
                </div>
                <div class="row my-2">
                  <div class="col-12 bigger">{{ hours }}
                      <span class="fs-6">Hrs</span>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-12 bigger">{{ minutes }}
                      <span class="fs-6">Mins</span>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-12 bigger">{{ seconds }}
                      <span class="fs-6">Secs</span>
                  </div>
                </div>
            </div>
            <div class="" v-else>
                <foods />
            </div>
    <!-- <div>{{ days }} days</div>
    <div>{{ hours }} hrs</div>
    <div>{{ minutes }} mins</div>
    <div>{{ seconds }} secs</div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted,computed } from 'vue'
import fireWorkEffect from './fire.vue'
import foods from './foods.vue'

import { useCommonStore } from '../stores/common'
const store = useCommonStore()

// For now, hardcode birthday. Replace with reactive input later.
const birthday = ref(new Date('2025-08-10T00:00:00'))

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

// const popperActive = ref(false)

function updateCountdown() {
  const now = new Date()
  let diff = birthday.value - now
  if (diff < 0) {
    diff = 0
  }
  days.value = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0')
  hours.value = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0')
  minutes.value = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0')
  seconds.value = String(Math.floor((diff / 1000) % 60)).padStart(2, '0')
}

let intervalId

onMounted(() => {
  updateCountdown()
  intervalId = setInterval(updateCountdown, 1000)
    store.isAM()  

})

onUnmounted(() => {
  clearInterval(intervalId)
})

const popperActive = computed(() => {
  return seconds.value == '00' && minutes.value == '00' && hours.value == '00' && days.value == '00'
})



</script>

<style>
.countdown {
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
  justify-content: center;
}
.bigger {
  font-size: 5rem;
  font-weight: bold;
}
</style>
