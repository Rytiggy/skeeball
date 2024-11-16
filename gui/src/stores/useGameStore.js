import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
export const useGameStore = defineStore('game', () => {
  const { instance, socket } = useApi()
  const games = ref([])
  const game = ref({
    score: 0,
    sensor: null,
    isActive: null,
    count: 0
  })

  const getLastGame = computed(() => {
    return games.value[games.value.length - 1]
  })

  async function getGames() {
    const response = await instance.get('/games')
    games.value = response.data
  }

  // Listen for messages
  socket.addEventListener("message", (event) => {
    const response = JSON.parse(event.data)
    const data = response.data

    if (response.type === 'start') {
      game.value = data

    } else if (response.type === 'end') {
      game.value = data
    }
    else if (response.type === 'score') {
      game.value = data
    }
  });




  return { games, game, getGames, getLastGame }
})
