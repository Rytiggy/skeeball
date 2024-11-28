<script setup>
const scores = defineModel('scores', { default: [] })
</script>

<template>
  <div class="gap-2 ">
    <h2 class="text-white">Last 5 Games</h2>
    <ol class="grid gap-1 score-board text-center">
      <li v-for="game in scores"><a class="arrow">
          <i class="fas fa-arrow-alt-right"></i>
          {{ game.player }} - {{ game.score }}
        </a>
      </li>
    </ol>
  </div>
</template>
<style>
.score-board {
  font-family: 'Press Start 2P';
  font-size: 14px;
}
</style>
