<script setup>
import scoreBoard from "@/components/scoreBoard.vue"
import { useGameStore } from "@/stores/useGameStore";
import { storeToRefs } from 'pinia'
const gameStore = useGameStore();
const { games } = storeToRefs(gameStore)

gameStore.getGames()
</script>

<template>
  <main>
    <scoreBoard />
    <!-- {{ games }} -->
  </main>
</template>
