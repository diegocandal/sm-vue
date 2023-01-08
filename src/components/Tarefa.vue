<template>
    <BoxItem>
        <div class="columns">
            <div class="column is-7">
                {{tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column">
                <CronoMetro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
        </div>

    </BoxItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CronoMetro from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa'
import BoxItem from './Box.vue';

export default defineComponent({
    name: 'TarefaItem',
    components: {
        CronoMetro,
        BoxItem
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    }
})

</script>

