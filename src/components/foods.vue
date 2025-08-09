<template>
  <div class="cake-rain">

    <div v-if="messagePlay" class="emoji-message text-center mb-3">
      <span v-if="selectedEmoji === '🎂'">{{ birthdayWish }} 🎂</span>
      <span v-else-if="selectedEmoji === '🐟'">{{ fishMessage }} 🐟</span>
      <span v-else-if="selectedEmoji === '🐘'">{{ elephantMessage }}</span>
      <span v-else-if="selectedEmoji === '🎉'">{{ birthdayWish }}</span>
    </div>
    <fire-work-effect v-if="popperActive"/>

    <div class="elephant" v-if="showEmoji && selectedEmoji === '🐘'" v-for="n in elephantcount" :key="n" :style="randomStyle()">
      {{ selectedEmoji }}
    </div>

    <div class="fish"  v-if="showEmoji && selectedEmoji === '🐟'" v-for="n in fishcount" :key="n" :style="randomStyle()">
      {{ selectedEmoji }}
    </div>

    <div class="cake"  v-if="showEmoji && selectedEmoji === '🎂'" v-for="n in cakeCount" :key="n" :style="randomStyle()">
      {{ selectedEmoji }}
    </div>
    
    <div class="title">Happy Birthday!</div>
    <!-- <div class="subtitle text-white">Welcome to </div> -->
    <div class="age-wrapper">
      <transition-group name="age" tag="div">
        <div v-if="showOldAge" :key="'old'" class="age old-age">{{ oldAge }}</div>
        <div v-else :key="'new'" class="age new-age">{{ newAge }}</div>
      </transition-group>
    </div>

    <div class="text-center subtitle">
        <button ref="hiddenBtn" style="display:none" @click="changeEmoji('🎉')">Hidden Play</button>
        <!-- <button :class="store.isLightMode ? 'btn btn-outline-info mx-1':'btn btn-outline-light mx-1'" @click="changeEmoji('🎉')">🎉</button> -->
        <button :class="store.isLightMode ? 'btn btn-outline-info mx-1':'btn btn-outline-light mx-1'" @click="changeEmoji('🎂')">🎂</button>
        <button :class="store.isLightMode ? 'btn btn-outline-info mx-1':'btn btn-outline-light mx-1'" @click="changeEmoji('🐟')">🐟</button>
        <button :class="store.isLightMode ? 'btn btn-outline-info mx-1':'btn btn-outline-light mx-1'" @click="changeEmoji('🐘')">🐘</button>
    </div>



  </div>
</template>

<script setup>
import { ref, onMounted,watch,computed, onBeforeUnmount } from 'vue'
import fireWorkEffect from './fire.vue'

import { useCommonStore } from '../stores/common'
const store = useCommonStore()


const oldAge = ref(0)
const newAge = ref(0) 
const showOldAge = ref(true)
const selectedEmoji = ref(null) 
const showEmoji = ref(true)
const hiddenBtn = ref(null)
const currentAudio = ref(null)
const popperActive = ref(false)
const firstTime = ref(false)
const profileData = ref({})
const messagePlay = ref(false)

const birthdayWish = ref('Happy Birthday, my love ❤️ You’re my everything, today and always.');
const fishMessage = ref(`It’s been too long since she’s had proper Kerala-style fish curry… she misses that spicy, tangy, coconut magic so much that she can almost smell it now. Nothing else comes close! 🐟🍛❤️`)
const elephantMessage = ref('She misses her hometown Thrissur — the land of majestic elephants and the vibrant Pooram festival.')

onMounted(async() => {
  setTimeout(() => {
    showOldAge.value = false
  }, 1500) 

  setTimeout(() => {
      hiddenBtn.value.click()
      firstTime.value = true
  }, 2000);
  

  store.isAM()  

  const response = await fetch('/src/assets/profile.json')
  profileData.value = await response.json()

})

const randomStyle = () =>{
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const duration = 5 + Math.random() * 5

  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }
}


const changeEmoji = (emoji) => {

  selectedEmoji.value = emoji
  messagePlay.value = false
  setTimeout(() => {
    messagePlay.value = true
  }, 1000);
}

watch(selectedEmoji, (newEmoji) => {
  
  showEmoji.value = false

  // Stop any previously playing audio
  
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
    currentAudio.value = null
  }

  let audioSrc = null

  if (newEmoji === '🎂') {
    audioSrc = '/wish.mp3'
  } else if (newEmoji === '🎉') {
    audioSrc = '/balloon-pop.mp3'

    if(!firstTime.value) {
      
      setInterval(() => {
        popperActive.value = false
        setTimeout(() => {
          popperActive.value = true
        }, 500);
      }, 3000)
    }

    firstTime.value = false
  } else if (newEmoji === '🐟') {
    audioSrc = '/fish.mp3'
  } else if (newEmoji === '🐘') {
    audioSrc = '/pooram.mp3'
  }

  if (audioSrc) {
    currentAudio.value = new Audio(audioSrc)
    // Uncomment if you want looping
    // currentAudio.loop = true
    currentAudio.value.play().catch(err => {
      console.log('Autoplay blocked — will play after user interaction', err)
    })
  }

  setTimeout(() => {
    showEmoji.value = true
  }, 100)
})

watch(profileData, (newData) => {
  if (newData.birthday) {
    const birthdayDate = new Date(newData.birthday)
    const today = new Date()
    const age = today.getFullYear() - birthdayDate.getFullYear()
    oldAge.value = age-1
    newAge.value = age
  }
}, { immediate: true })

const elephantcount = computed(() => selectedEmoji.value === '🐘' ? 4 : 30)
const fishcount = computed(() => selectedEmoji.value === '🐟' ? 10 : 30)
const cakeCount = computed(() => selectedEmoji.value === '🎂' ? 10 : 30)



onBeforeUnmount(() => {
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.currentTime = 0
    currentAudio.value = null
  }
})
</script>

<style scoped>
.birthday-container {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #fff6e6, #ffe0f0);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 183, 255, 0.3);
}

.title {
  font-size: 2.5rem;
  color: #ff69b4;
  font-weight: bold;
  margin-bottom: 20px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.age-wrapper {
  height: 80px;
  position: relative;
  overflow: hidden;
  color: #f3900d;
}

.age {
  font-size: 4rem;
  font-weight: bold;
  position: absolute;
  width: 100%;
  left: 0;
  text-align: center;
}

/* Transition enter/leave classes */
.age-enter-active,
.age-leave-active {
  transition: all 0.8s ease;
}

.age-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.age-leave-to {
  opacity: 0;
  transform: translateY(100px) rotate(45deg);
}

.age-enter-from {
  opacity: 0;
  transform: translateY(-100px) scale(0.5);
}

.age-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.subtitle {
  font-size: 1.5rem;
  color: #444;
  margin-top: 30px;
}


.cake-rain-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
  background: linear-gradient(to bottom, #fff0f5, #ffe4e1);
}

.cake {
  position: absolute;
  top: -50px;
  font-size: 2rem;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  z-index: 1;
  /* pointer-events: none; */
}

.elephant {
  position: absolute;
  bottom: 50px;
  left: -100px; /* start off-screen */
  font-size: 4rem;
  animation: walkAcross 8s linear forwards;
  /* pointer-events: none; */
}

.fish {
    position: fixed;
    top: 50%; /* starting vertical position */
    left: -50px; /* start off-screen */
    font-size: 2rem;
    margin: calc(2px + (13 * random()));
    animation: swim 8s linear infinite, wave 2s ease-in-out infinite;
  }


@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes walkAcross {
  0% {
    transform: translateX(0) translateY(0);
  }
  10% {
    transform: translateX(-10%) translateY(-5px);
  }
  20% {
    transform: translateX(-20%) translateY(0);
  }
  30% {
    transform: translateX(-30%) translateY(-5px);
  }
  40% {
    transform: translateX(-40%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-5px);
  }
  60% {
    transform: translateX(-60%) translateY(0);
  }
  70% {
    transform: translateX(-70%) translateY(-5px);
  }
  80% {
    transform: translateX(-80%) translateY(0);
  }
  90% {
    transform: translateX(-90%) translateY(-5px);
  }
  100% {
    transform: translateX(-110vw) translateY(0); /* exit screen left */
  }

  
}

@keyframes swim {
    from {
      transform: translateX(0);
      left: 110vw; /* exit off-screen on the right */
    }
    to {
      left: -50px;
    }
  }

  @keyframes wave {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px); /* up */
    }
    100% {
      transform: translateY(0); /* back down */
    }
  }


  .emoji-message
  {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    background: rgba(255,255,255,0.95);
    padding: 12px 28px;
    border-radius: 18px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.08);
    font-size: 0.9rem;
    font-weight: 500;
    color: #d72660;
    animation: fadeOut 1s linear 7s forwards;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }


</style>

