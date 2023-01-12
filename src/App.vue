<template>
  <main class="columns is-gapless is-multiline">

    <div class="column is-one-quarter">
      <LeftBar />
    </div>

    <div class="column is-three-quarters">
      <FormItem @onSaveTask="saveTask"/>
      
      <div class="list">
        <div class="progressBar">
          <progress v-if="loading" class="progress is-small is-primary" max="100"></progress>
        </div>
        
        <BoxItem v-if="emptyList && !loading">Nothing to see here :(</BoxItem>
          
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" @onDelete="deleteTask(task)" @onUpdate="updateTask(task)"/>
          
      </div>
    </div>
  </main>
  <NotifyItem :displayMsg="displayMsg" />
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
import NotifyItem from './components/Notify.vue';

export default defineComponent({
  name: 'App',
  components: {
    LeftBar,
    FormItem,
    TaskItem,
    BoxItem,
    NotifyItem
  },

  data () {
    return {
      tasks: [] as ITask[],
      message: "",
      displayMsg: false,
      loading: false,
    }
  },

  computed: {
    emptyList () : boolean {
      return this.tasks.length === 0
    },
  },

  methods: {

    retrieveTasks() {
      this.loading = true;
      TaskDataService.getAll()
        .then((response: ResponseData) => {
          this.tasks = response.data.data;
          this.loading = false;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    saveTask(task:any) {
      this.loading = true;
      let data = {
        title: task.title,
        time: (Number.isInteger(task.time)) ? this.convertDate(task.time) : task.time,
      };
      
      TaskDataService.create(data)
        .then((response: ResponseData) => {
          this.tasks.push(response.data.data);
          this.notify()
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateTask(task:ITask) {
      this.loading = true;
      TaskDataService.update(task.id, task)
        .then((response: ResponseData) => {
          this.retrieveTasks();
          this.notify()
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteTask(task:ITask) {
      this.loading = true;
      TaskDataService.delete(task.id)
        .then((response: ResponseData) => {
          this.tasks.forEach((item, index) => {
            if(item.id === task.id) this.tasks.splice(index,1);
          })
          this.notify()
      })
      .catch((e: Error) => {
        console.log(e);
      });
    },

    convertDate(seconds: number) {
       return new Date(seconds*1000).toISOString().substring(11, 19)
    },

    notify() {
      this.loading = false;
      this.displayMsg = true;
      setInterval(() => {
            this.displayMsg = false;
      }, 1500)
    }

  },    

  mounted() {
    this.retrieveTasks();
  }

});
</script>

<style>
.list {
  padding: 1.25rem;
}

.progressBar {
  min-height: 1.5rem;
}

</style>
