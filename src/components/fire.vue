<template>
  <div :class="popped ? 'confetti-container-updated':'confetti-container'" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import confetti from 'canvas-confetti'

const container = ref(null)
let canvas = null
let myConfetti = null
const popped = ref(false)

onMounted(() => {
  canvas = document.createElement('canvas')
  canvas.style.position = 'absolute'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  container.value.appendChild(canvas)

  myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true
  })

  // Launch confetti once
  myConfetti({
    particleCount: 300,
    spread: 200,
    origin: { y: 0.6 }
  })

  setTimeout(() => {
    popped.value = true
  }, 4000);
})

onBeforeUnmount(() => {
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas)
  }
})
</script>

<style scoped>
.confetti-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0; /* adjust if needed */
}

.confetti-container-updated {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1; /* adjust if needed */
}
</style>
