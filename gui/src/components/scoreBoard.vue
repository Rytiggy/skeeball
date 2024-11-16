<script setup>
import { useGameStore } from "@/stores/useGameStore";
import { storeToRefs } from 'pinia'
const gameStore = useGameStore();
const { game } = storeToRefs(gameStore)

</script>

<template>
    <div class="scoreboard">
        <div class="header">
            <span class="skee-ball">SKEE-BALL</span>
            <div class="decorative">
                <span>*</span><span>*</span><span>*</span>
            </div>
            <span class="since">Since 2024</span>
        </div>
        <div class="score-section">
            <div class="label">
                <div> YOUR </div>
                <div> SCORE </div>

            </div>
            <div class="score">{{ game.score }}</div>
        </div>

    </div>
    <div class="game-status" :class="[game.isActive ? 'text-blue' : 'text-red']">
        {{ game.isActive ? 'Active' : 'Press Start' }}
    </div>

    <div class="label-sm pt-md">Ball {{ game.count }} of 9</div>

</template>
<style>
/* Import fonts for SKEE-BALL and Digital display */
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=VT323&display=swap');

/* style.css */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #111;
    margin: 0;
    overflow: hidden;
}

.scoreboard {
    text-align: center;
    color: #fff;
    background-color: #000;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    zoom: 2;
}

.header {
    font-family: 'Audiowide', sans-serif;
    /* Retro arcade style for SKEE-BALL */
    font-size: 36px;
    position: relative;
    text-align: center;
}

.skee-ball {
    display: block;
    font-size: 60px;
    color: #ff0000;
    margin-bottom: 10px;
    text-shadow:
        -1px -1px 0 #fff,
        1px -1px 0 #fff,
        -1px 1px 0 #fff,
        1px 1px 0 #fff;
}

.decorative {
    font-size: 24px;
    color: #ff3300;
    text-shadow: 0 0 5px #ff6600, 0 0 10px #ff6600;
    display: flex;
    justify-content: center;
    margin: -25px 0 10px;
}

.decorative span {
    margin: 0 10px;
}

.since {
    font-size: 16px;
    color: #888;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    margin-top: -15px;
    display: block;
}

.score-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.label {
    font-family: 'VT323', monospace;
    /* 8-bit style for "Your Score" */
    color: #00ffff;
    font-size: 25px;
    margin-right: 20px;
    text-align: center;
    line-height: 20px;

    text-shadow: 0 0 10px #00ffff, 0 0 20px #00cccc, 0 0 30px #00cccc;
}

.label-sm {
    font-family: 'Audiowide', sans-serif;

    color: #888;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    font-size: 35px;
    text-align: center;
    line-height: 35px;
}

.score {
    font-family: 'VT323', monospace;
    /* 8-bit style for the score */
    color: #ff0000;
    font-size: 60px;
    text-shadow: 0 0 10px #ff0000, 0 0 20px #ff3333, 0 0 30px #ff3333;
}


.text-blue {
    color: #00ffff;
}

.text-red {
    color: #ff0000;
}


.game-status {
    font-family: 'VT323', monospace;
    font-size: 65px;
    text-align: center;
    margin-top: 30px;
}

.pt-md {
    padding-top: 10px;
}
</style>