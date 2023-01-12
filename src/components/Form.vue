<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="New task form">
                <input type="text" class="input" placeholder="Type here your awesome new task :)" v-model="title"/>
            </div>
            <div class="column">
                <TimerItem @onStopTimer="callTaskSaver" />

            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import TimerItem from './Timer.vue';

export default defineComponent({
    name: 'FormItem',
    emits: ['onSaveTask'],
    components: {
        TimerItem
    },
    data (){
        return {
            title: ''
        }
    },
    methods: {
        callTaskSaver(elapsedTime: number) : void {
            this.$emit('onSaveTask', {
                time: new Date(elapsedTime * 1000).toISOString().substring(11, 19).toString(),
                title: this.title
            })
            this.title = '';
        }
    }
})

</script>
