<template>
    <BoxItem>
        <div class="columns">
            <div class="column is-7">
                {{task.title || 'Task sem descrição' }}
                <div class="column is-6" v-if="task.updating">
                    <input type="text" class="input" placeholder="Qual task você deseja iniciar?" v-model="title"/>
                </div>
            </div>
            <div class="column">
                {{ task.time }}
            </div>
            <div class="column is-3">
                <div class="buttons">
                    <button class="button is-warning" v-if="!task.updating" @click="displayTaskUpdateField(task)" :disabled="task.updating || task.deleting">
                        Update
                    </button>
                    <button class="button is-success" v-if="task.updating" @click="updateTask(task)" :disabled="task.saving">
                        Save
                    </button>
                    <button class="button is-danger" v-if="!task.updating" @click="deleteTask(task)" :disabled="task.deleting">
                        Delete
                    </button>
                    <button class="button is-light" v-if="task.updating" @click="cancelUpdatingTask(task)" :disabled="task.saving">
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    </BoxItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ITask from '../interfaces/ITask'
import BoxItem from './Box.vue';

export default defineComponent({
    name: 'TaskItem',
    emits: ['onDelete','onUpdate'],
    components: {
        BoxItem
    },
    data (){
        return {
            title: ''
        }
    },    
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    },
    
    methods: {    
        deleteTask(task: ITask) {
            task.deleting = true;
            this.$emit('onDelete', task.id)
        },

        displayTaskUpdateField(task: ITask) {
            this.title = task.title;
            task.updating = true;
        },

        updateTask(task: ITask) {
            task.saving = true;
            task.title = this.title;
            this.$emit('onUpdate', task)
        },

        cancelUpdatingTask(task: ITask) {
            task.updating = false;
        },
    }
})

</script>

