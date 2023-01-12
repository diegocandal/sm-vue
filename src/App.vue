<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <LeftBar />
    </div>
    <div class="column is-three-quarters">
      <FormItem @aoSalvarTask="saveTask"/>
      <div class="lista">
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" @onDelete="deleteTask(task)" @onUpdate="updateTask(task)"/>
        <BoxItem v-if="listaEstaVazia">
          Nothing to see here :(
        </BoxItem>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LeftBar from './components/LeftBar.vue';
import FormItem from './components/Form.vue';
import TaskItem from './components/Task.vue';
import ITask from './interfaces/ITask';
import BoxItem from './components/Box.vue';
import ResponseData from "@/types/ResponseData";
import TaskDataService from "@/services/TaskDataService";

export default defineComponent({
  name: 'App',
  components: {
    LeftBar,
    FormItem,
    TaskItem,
    BoxItem
  },

  data () {
    return {
      tasks: [] as ITask[],
      message: "",
    }
  },

  computed: {
    listaEstaVazia () : boolean {
      return this.tasks.length === 0
    }
  },

  methods: {

    saveTask(task:any) {
      let data = {
        title: task.title,
        time: (Number.isInteger(task.time)) ? this.convertDate(task.time) : task.time,
      };

      TaskDataService.create(data)
        .then((response: ResponseData) => {
          //console.log(response.data);
          this.tasks.push(response.data.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    convertDate(seconds: number) {
      //console.log(seconds);
       return new Date(seconds*1000).toISOString().substring(11, 19)
    },

    retrieveTasks() {
      TaskDataService.getAll()
        .then((response: ResponseData) => {
          this.tasks = response.data.data;
          //console.log(response.data.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateTask(task:ITask) {
      TaskDataService.update(task.id, task)
        .then((response: ResponseData) => {
          //console.log(response.data);
          this.message = "Task was updated!";
          this.retrieveTasks();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteTask(task:ITask) {
      TaskDataService.delete(task.id)
        .then((response: ResponseData) => {
          //console.log(response.data);
          this.retrieveTasks();
      })
      .catch((e: Error) => {
        console.log(e);
      });
    },
  },    

  mounted() {
    this.retrieveTasks();
  },

});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
