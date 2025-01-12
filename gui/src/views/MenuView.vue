<script setup>
import { useGameStore } from '@/stores/useGameStore';
import lastFiveGames from "@/components/lastFiveGames.vue";
import { ref } from 'vue';
const name = ref()
const gameStore = useGameStore()
function reset() {
  gameStore.resetGame()
}
gameStore.getLastFiveGames()
</script>
<template>
  <div class="grid align-items-center justify-content-center gap-2">
    <h1 class="text-white text-h3">Menu</h1>
    <!-- <input v-model="name" /> -->

    <button warning @click="reset">Reset Game</button>




    <!-- <lastFiveGames :scores="gameStore.lastFiveGames" /> -->
  </div>
</template>

<style></style>
