<script setup>
import { useGameStore } from '@/stores/useGameStore';
import { ref } from 'vue';
const name = ref()
const gameStore = useGameStore()
function start() {
  gameStore.startGame(name.value)
}
</script>
<template>
  <div class="about">
    <h1 class="text-white text-h3">Who's playing</h1>
    <input v-model="name" />

    <button @click="start">Start</button>
  </div>
</template>

<style></style>
