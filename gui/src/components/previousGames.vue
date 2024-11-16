<script setup>
import { useGameStore } from "@/stores/useGameStore";
import { storeToRefs } from 'pinia'
import { computed } from "vue";

const gameStore = useGameStore();
gameStore.getGames()
const lastGame = computed(() => gameStore.getLastGame.value)

</script>

<template>

    <div class="text-white">
        {{ gameStore.getLastGame }}
    </div>

</template>
<style scoped></style>