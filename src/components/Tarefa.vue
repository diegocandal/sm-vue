<template>
    <BoxItem>
        <div class="columns">
            <div class="column is-7">
                {{tarefa.title || 'Tarefa sem descrição' }}
            </div>
            <div class="column">
                {{ tarefa.time }}
            </div>
            <div class="column">
                <button class="button is-danger" @click="deleteTask" :disabled="tarefa.deleting">
                    Delete
                </button>
            </div>
        </div>

    </BoxItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
//import CronoMetro from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa'
import BoxItem from './Box.vue';

export default defineComponent({
    name: 'TarefaItem',
    emits: ['onDelete'],
    components: {
        //CronoMetro,
        BoxItem
    },

    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    
    methods: {    
        deleteTask() {
            //this.tarefa.deleting = true;
            console.log(this.tarefa.id);
            this.$emit('onDelete', this.tarefa.id)
        },
    }
})

</script>

