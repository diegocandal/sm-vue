<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao"/>
            </div>
            <div class="column">
                <TempoRizador @ao-temporizador-finalizado="finalizarTarefa" />

            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import TempoRizador from './Temporizador.vue';

export default defineComponent({
    name: 'FormuLario',
    emits: ['aoSalvarTarefa'],
    components: {
        TempoRizador
    },
    data (){
        return {
            descricao: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number) : void {
            //console.log(new Date(tempoDecorrido*1000).toISOString().substring(11, 19).toString());
            //console.log(new Date(tempoDecorrido*1000).toISOString().substring(11, 19));
            //console.log(new Date(tempoDecorrido*1000).toISOString());
            //console.log(tempoDecorrido);
            this.$emit('aoSalvarTarefa', {
                time: new Date(tempoDecorrido * 1000).toISOString().substring(11, 19).toString(),
                title: this.descricao
            })
            this.descricao = '';
        }
    }
})

</script>
