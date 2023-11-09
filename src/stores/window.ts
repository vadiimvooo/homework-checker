import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWindowStore = defineStore('window', () => {
    const windowWidth = ref(window.outerWidth);
    const changeWindowWidth = (pixels: number) => {
        windowWidth.value = pixels;
    }

    return { windowWidth, changeWindowWidth }
})
