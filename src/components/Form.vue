<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova task">
                <input type="text" class="input" placeholder="Qual task você deseja iniciar?" v-model="title"/>
            </div>
            <div class="column">
                <TimerItem @onStopTimer="finalizarTask" />

            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import TimerItem from './Timer.vue';

export default defineComponent({
    name: 'FormItem',
    emits: ['aoSalvarTask'],
    components: {
        TimerItem
    },
    data (){
        return {
            title: ''
        }
    },
    methods: {
        finalizarTask(tempoDecorrido: number) : void {
            this.$emit('aoSalvarTask', {
                time: new Date(tempoDecorrido * 1000).toISOString().substring(11, 19).toString(),
                title: this.title
            })
            this.title = '';
        }
    }
})

</script>
