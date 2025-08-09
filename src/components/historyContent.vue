<template>
<div :class="store.isLightMode ? 'p-5':'p-5 bg-dark text-white'">
    <p class="fs-3">
        <span class="striped" style="text-decoration: line-through;">History</span>
        <span class="mx-1">Her story</span>
    </p>
    <ul class="timeline">
        <li v-for="(item, index) in historyData.history" :key="index" class="timeline-item mb-5">
            <div :class="store.isLightMode ? 'card' :'card bg-dark text-white border-dark-subtle'">
                <div class="card-body">
                    <p class="card-text">{{ item.details }}</p>
                </div>
            </div>
        </li>
    </ul>

</div>
</template>

<script setup>
        import { ref, onMounted } from 'vue'

        import { useCommonStore } from '../stores/common'
        const store = useCommonStore()

        const historyData = ref([])

onMounted(async () => {
    const response = await fetch('/src/assets/history.json')
    historyData.value = await response.json()
    store.isAM() 

})
</script>

<style scoped>
.timeline {
        list-style: none;
        padding: 0;
        position: relative;
    }
    .timeline:before {
        content: '';
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #dee2e6;
    }
    .timeline-item {
        position: relative;
        margin-left: 40px;
    }
    .timeline-item:before {
        content: '';
        position: absolute;
        left: -28px;
        top: 18px;
        width: 16px;
        height: 16px;
        background: #0d6efd;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 0 0 2px #dee2e6;
    }
</style>