<template>

    <div class="is-flex is-align-items-center is-justify-content-space-between">

        <StopwatchItem :timeInSeconds="timeInSeconds" />

        <button class="button" @click="start" :disabled="countingTime">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>start</span>
        </button>
        <button class="button" @click="stop" :disabled="!countingTime">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>

</template>


<script lang="ts">

import { defineComponent } from 'vue';
import StopwatchItem  from './Stopwatch.vue';

export default defineComponent({
    name: 'TimerItem',
    emits: ['onStopTimer'],
    components: {
        StopwatchItem
    },
    data() {
        return {
            timeInSeconds: 0,
            stopWatch: 0,
            countingTime: false
        }
    },
    methods: {
        start() {
            // start counting
            this.countingTime = true;
            this.stopWatch = setInterval(() => {
                this.timeInSeconds += 1;
            }, 1000)
        },
        stop() {
            this.countingTime = false;
            clearInterval(this.stopWatch)
            this.$emit('onStopTimer', this.timeInSeconds)
            this.timeInSeconds = 0;
        }
    }
})

</script>