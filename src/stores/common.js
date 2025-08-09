import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
    state: () => ({
        isLightMode: false,
    }),
    actions: {
        toggleLightMode() {
            this.isLightMode = !this.isLightMode
        },
        setLightMode(value) {
            this.isLightMode = value
        },
        isAM()
        {
            const now = new Date()
            const hour = now.getHours()
            const result =  hour >= 6 && hour < 18
            if(result)
            {
                this.setLightMode(false)
            }
        },
        getLightMode() {
            return this.isLightMode
        }
    }
})