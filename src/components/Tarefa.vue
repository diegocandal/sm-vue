<template>
    <BoxItem>
        <div class="columns">
            <div class="column is-7">
                {{tarefa.title || 'Tarefa sem descrição' }}
                <div class="column is-6" v-if="tarefa.updating">
                    <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="title"/>
                </div>
            </div>
            <div class="column">
                {{ tarefa.time }}
            </div>
            <div class="column is-3">
                <div class="buttons">
                    <button class="button is-warning" v-if="!tarefa.updating" @click="displayTaskUpdateField(tarefa)" :disabled="tarefa.updating">
                        Update
                    </button>
                    <button class="button is-success" v-if="tarefa.updating" @click="updateTask(tarefa)" :disabled="tarefa.saving">
                        Save
                    </button>
                    <button class="button is-danger" v-if="!tarefa.updating" @click="deleteTask(tarefa)" :disabled="tarefa.deleting">
                        Delete
                    </button>
                    <button class="button is-light" v-if="tarefa.updating" @click="cancelUpdatingTask(tarefa)" :disabled="tarefa.saving">
                        Cancel
                    </button>
                </div>
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
    emits: ['onDelete','onUpdate'],
    components: {
        //CronoMetro,
        BoxItem
    },
    data (){
        return {
            title: ''
        }
    },    
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    
    methods: {    
        deleteTask(tarefa: ITarefa) {
            tarefa.deleting = true;
            //console.log(tarefa.id);
            this.$emit('onDelete', tarefa.id)
        },

        displayTaskUpdateField(tarefa: ITarefa) {
            this.title = tarefa.title;
            tarefa.updating = true;
            //console.log(tarefa.id);
        },

        updateTask(tarefa: ITarefa) {
            tarefa.saving = true;
            tarefa.title = this.title;
            console.log(tarefa.id);
            this.$emit('onUpdate', tarefa)
        },

        cancelUpdatingTask(tarefa: ITarefa) {
            tarefa.updating = false;
        },
    }
})

</script>

