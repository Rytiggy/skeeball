<script setup>
import { useGameStore } from "@/stores/useGameStore";
import { storeToRefs } from 'pinia'
import { watch, onMounted, ref } from "vue";
const gameStore = useGameStore();
const { game, topScore, isPending } = storeToRefs(gameStore)
const readyAudio = ref()
const startAudio = ref()
const gameOverAudio = ref()
const scoreAudio = ref()
const score10Audio = ref()
const newHighScoreAudio = ref()
const wowYouTried = ref()
const missAudio = ref()
const showGameOver = ref(false)
onMounted(() => {
  readyAudio.value.play();
  gameStore.getHighScore()
})


watch(game, (newValue, oldValue) => {
  console.log(" game.value.points", game.value.points, oldValue.count, newValue.count)
  if (oldValue.score < newValue.score) {
    scoreAudio.value.play()
    // if (currentScore == 10) {
    //   score10Audio.value.play()
    // }
    // missAudio.value.play()


  }
  if (newValue.isActive !== oldValue.isActive) {
    if (game.value.isActive) {
      // startAudio.value.play();
      showGameOver.value = false;

    }
    if (!game.value.isActive) {
      showGameOver.value = true;
      if (isPending.value)
        return
      if (game.value.score > topScore.value.ever || game.value.score > topScore.value.today) {
        newHighScoreAudio.value.play()
      } else if (game.value.score === topScore.value.ever || game.value.score === topScore.value.today) {
        // For the lol's - if they get the same score as the top score 
        wowYouTried.value.play()
      }
      setTimeout(() => {
        showGameOver.value = false;
      }, 5000)
    }
  }

}, { deep: true })


</script>

<template>
  <div class="scoreboard mt-md">
    <audio ref="readyAudio">
      <source src="@/assets/audio/ready.mp3" type="audio/mp3">
    </audio>
    <audio ref="startAudio">
      <source src="@/assets/audio/retro-start.mp3" type="audio/mp3">
    </audio>
    <audio ref="scoreAudio">
      <source src="@/assets/audio/score.mp3" type="audio/mp3">
    </audio>
    <audio ref="score10Audio">
      <source src="@/assets/audio/skeeballsounds/10.mp3" type="audio/mp3">
    </audio>
    <audio ref="wowYouTried">
      <source src="@/assets/audio/skeeballsounds/wow_you_tried.mp3" type="audio/mp3">
    </audio>
    <audio ref="missAudio">
      <source src="@/assets/audio/you_missed.mp3" type="audio/mp3">
    </audio>
    <!-- <audio ref="gameOverAudio">
      <source src="@/assets/audio/game-over.mp3" type="audio/mp3">
    </audio> -->
    <audio ref="newHighScoreAudio">
      <source src="@/assets/audio/high-score.mp3" type="audio/mp3">
    </audio>
    <div class="header mt-md">
      <span class="skee-ball">SKEE-BALL</span>
    </div>


    <div v-if="showGameOver" class="text-center grid gap-1 mt-lg">
      <span class="game-over">GAME OVER</span>
      <div class="text-h4 text-yellow">Score: {{ game.score }}</div>
    </div>
    <div v-else class="score-section flex gap-1">
      <div class="text-h4 text-blue">
        <div> {{ game.isActive ? "YOUR" : "LAST" }} </div>
        <div> SCORE </div>
      </div>
      <div class="text-h2 text-red">{{ game.score }}</div>
    </div>

  </div>


</template>
<style>
.scoreboard {
  text-align: center;
  color: #fff;
}



.skee-ball {
  display: block;
  font-size: 140px;
  color: #ff0000;
  text-shadow:
    -1px -1px 0 #fff,
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
    1px 1px 0 #fff;
}


.score-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.score {
  font-family: "Press Start 2P", system-ui;
  color: var(--red);
  font-size: 80px;
}

.game-over {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 65px;
  color: red;
  text-shadow:
    2px 2px 0 #000,
    -2px -2px 0 #000,
    2px -2px 0 #000,
    -2px 2px 0 #000,
    4px 4px 0 rgba(255, 0, 0, 0.7);
  animation: blink 1s infinite alternate;
}

@keyframes blink {
  0% {
    opacity: 1;
    text-shadow:
      2px 2px 0 #000,
      -2px -2px 0 #000,
      2px -2px 0 #000,
      -2px 2px 0 #000,
      4px 4px 8px rgba(255, 0, 0, 0.9);
  }

  100% {
    opacity: 0.5;
    text-shadow:
      2px 2px 0 #000,
      -2px -2px 0 #000,
      2px -2px 0 #000,
      -2px 2px 0 #000,
      4px 4px 15px rgba(255, 0, 0, 0.5);
  }
}
</style>