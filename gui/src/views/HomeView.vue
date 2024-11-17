<script setup>
import scoreBoard from "@/components/scoreBoard.vue"
import topScore from "@/components/topScore.vue";

</script>

<template>
  <main class="grid gap-1">
    <topScore class="mt-md" />
    <scoreBoard />
  </main>
</template>
