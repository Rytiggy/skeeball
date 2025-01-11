<script setup>
import { useGameStore } from "@/stores/useGameStore";
import { storeToRefs } from 'pinia'
const gameStore = useGameStore();
const { topScore, game, isPending } = storeToRefs(gameStore)

</script>

<template>
    <div class="flex space-around">
        <div class="grid gap-1">
            <div class="label-sm">Today</div>
            <div class="text-h4 text-white">{{ topScore.today }}</div>
        </div>

        <div v-if="game.isActive" class="grid gap-1">
            <div class="label-sm">{{ game.player }}</div>
            <div class="text-h4 text-white pt-md">Balls Left: {{ 9 - game.count }}</div>
        </div>
        <div class="label-sm text-pulse" v-else-if="isPending">
            Please wait...
        </div>
        <div v-else class="text-h4 mt-md text-fun">
            Press Start!
        </div>

        <div class="grid gap-1">
            <div class="label-sm">All Time</div>
            <div class="text-h4 text-white">{{ topScore.ever }}</div>

        </div>
    </div>
</template>