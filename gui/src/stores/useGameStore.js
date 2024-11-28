import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useGameStore = defineStore('game', () => {
  const { instance, socket } = useApi()
  const game = ref({
    score: 0,
    isActive: false,
    count: 0,
    points: [],
    player: "Player"
  })


  const topScore = ref({
    today: 0,
    ever: 0
  })

  const lastFiveGames = ref([])




  async function startGame(player = "Player") {
    const response = await instance.post('/start-game', { data: { player } })
    console.log(response?.data?.game)
    // topScore.value = response.data
  }


  async function getHighScore() {
    const response = await instance.get('/high-score')
    console.log(response)
    topScore.value = response.data
  }



  async function getLastFiveGames() {
    const response = await instance.get('/last-5-games')
    console.log(response)
    lastFiveGames.value = response.data.lastFiveGames
  }

  // Listen for messages
  socket.addEventListener("message", (event) => {
    const response = JSON.parse(event.data)
    const data = response.data
    console.log('ws', data)
    if (response.type === 'start') {
      game.value = data.game

    } else if (response.type === 'end') {
      game.value = data.game
      getLastFiveGames()
    }
    else if (response.type === 'score') {
      game.value = data.game
    }
    getHighScore()

  });



  return { game, topScore, lastFiveGames, getHighScore, startGame, getLastFiveGames }
})
