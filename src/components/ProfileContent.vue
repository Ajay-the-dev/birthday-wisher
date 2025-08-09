<template>
<div :class="store.isLightMode ? 'bg-white text-dark' : 'bg-dark text-white'">
    <div v-if="profileData" :class="store.isLightMode ? 'p-4':'p-4'">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div :class="store.isLight ? 'Modecard shadow-lg border-0 rounded-4':'Modecard shadow-lg border-0 rounded-4 bg-black'">
                    <div class="card-body d-flex align-items-center gap-4">
                        <img :src="profileData.image" alt="Profile Image" class="rounded-circle border border-3 border-light shadow-sm" style="width: 120px; height: 120px; object-fit: cover;">
                        <div>
                            <h2 class="card-title mb-1">{{ profileData.name }}</h2>
                            <!-- <h6 class="text-muted mb-2">{{ profileData.title }}</h6> -->
                            <p class="card-text mb-0">
                                <i class="bi bi-instagram me-2 text-danger" ></i>
                                    <a :href="'https://www.instagram.com/'+profileData.instagram" target="_blank">
                                        {{ profileData.instagram }}
                                    </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="row g-3">
                        <div class="col-12">
                            <div :class="store.isLight ? 'card border-0 shadow-sm rounded-3':'card border-0 shadow-sm rounded-3 bg-black text-white'">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <i class="bi bi-person-vcard me-2 text-primary"></i> About
                                    </h5>
                                    <ul class="list-unstyled mb-0">
                                        <li><i class="bi bi-cake2 me-2 text-warning"></i> <strong>Birthday:</strong> {{ profileData.birthday }}</li>
                                        <li><i class="bi bi-gender-female me-2 text-pink"></i> <strong>Gender:</strong> {{ profileData.gender }}</li>
                                        <li><i class="bi bi-flag me-2 text-success"></i> <strong>Nationality:</strong> {{ profileData.nationality }}</li>
                                        <li><i class="bi bi-briefcase me-2 text-info"></i> <strong>Profession:</strong> {{ profileData.profession }}</li>
                                        <li><i class="bi bi-palette me-2 text-orange"></i> <strong>Favorite Color:</strong> {{ profileData.favorites.color }}</li>
                                        <li><i class="bi bi-egg-fried me-2 text-danger"></i> <strong>Favorite Food:</strong> {{ profileData.favorites.food }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div :class="store.isLight ? 'card border-0 shadow-sm rounded-3':'card border-0 shadow-sm rounded-3 bg-black text-white'">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <i class="bi bi-stars me-2 text-warning"></i> Personality & Attitude
                                    </h5>
                                    <div class="row">
                                        <div class="col-md-6 mb-2">
                                            <strong>Personality:</strong>
                                            <ul class="mb-0">
                                                <li v-for="trait in profileData.character.personality" :key="trait">
                                                    <i class="bi bi-heart-fill text-danger me-1"></i> {{ trait }}
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <strong>Attitude:</strong>
                                            <ul class="mb-0">
                                                <li v-for="att in profileData.character.attitude" :key="att">
                                                    <i class="bi bi-emoji-smile text-success me-1"></i> {{ att }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div :class="store.isLightMode ? 'card border-0 shadow-sm rounded-3':'card border-0 shadow-sm rounded-3 bg-black text-white'">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <i class="bi bi-lightbulb me-2 text-info"></i> Strengths & Weaknesses
                                    </h5>
                                    <div class="row">
                                        <div class="col-md-6 mb-2">
                                            <strong>Strengths:</strong>
                                            <ul class="mb-0">
                                                <li v-for="strength in profileData.character.strengths" :key="strength">
                                                    <i class="bi bi-check-circle-fill text-success me-1"></i> {{ strength }}
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <strong>Weaknesses:</strong>
                                            <ul class="mb-0">
                                                <li v-for="weakness in profileData.character.weaknesses" :key="weakness">
                                                    <i class="bi bi-exclamation-triangle-fill text-warning me-1"></i> {{ weakness }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div :class="store.isLightMode ? 'card border-0 shadow-sm rounded-3':'card border-0 shadow-sm rounded-3 bg-black text-white'">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <i class="bi bi-balloon-heart me-2 text-danger"></i> Hobbies
                                    </h5>
                                    <ul class="list-inline mb-0">
                                        <li v-for="hobby in profileData.hobbies" :key="hobby" class="list-inline-item me-3">
                                            <span :class="store.isLightMode ? 'badge bg-light text-dark border shadow-sm px-3 py-2':'badge bg-light text-dark border shadow-sm px-3 py-2 bg-dark text-white'">
                                                <i class="bi bi-star-fill text-warning me-1"></i> {{ hobby }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div :class="store.isLightMode ? 'card border-0 shadow-sm rounded-3':'card border-0 shadow-sm rounded-3 bg-black text-white'">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">
                                        <i class="bi bi-globe-americas me-2 text-primary"></i> Dreams
                                    </h5>
                                    <ul class="mb-0">
                                        <li v-for="dream in profileData.dreams" :key="dream">
                                            <i class="bi bi-rocket-takeoff-fill text-info me-1"></i> {{ dream }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div :class="store.isLightMode ? 'card border-0 shadow-sm rounded-3 bg-light':'card border-0 shadow-sm rounded-3 bg-black text-white'">
                                <div class="card-body text-center">
                                    <blockquote class="blockquote mb-0">
                                        <p class="fs-5"><i class="bi bi-quote text-secondary me-2"></i>{{ profileData.quote }}</p>
                                        <footer class="blockquote-footer mt-2">{{ profileData.name }}</footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
        import { ref, onMounted } from 'vue'
        import { useCommonStore } from '../stores/common'
        const store = useCommonStore()

        const profileData = ref(null)

        onMounted(async () => {
            const response = await fetch('/profile.json')
            
            profileData.value = await response.json()

            store.isAM() 

        })
</script>

<style scoped>

</style>