<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarters">
      <FormuLario @aoSalvarTarefa="saveTask"/>
      <div class="lista">
        <TarefaItem v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @onDelete="deleteTask(tarefa)" @onUpdate="updateTask(tarefa)"/>
        <BoxItem v-if="listaEstaVazia">
          Você não está muito produtivo hoje :(
        </BoxItem>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormuLario from './components/Formulario.vue';
import TarefaItem from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa';
import BoxItem from './components/Box.vue';
import ResponseData from "@/types/ResponseData";
import TaskDataService from "@/services/TaskDataService";

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormuLario,
    TarefaItem,
    BoxItem
  },

  data () {
    return {
      tarefas: [] as ITarefa[],
      message: "",
    }
  },

  computed: {
    listaEstaVazia () : boolean {
      return this.tarefas.length === 0
    }
  },

  methods: {

    saveTask(tarefa:any) {
      let data = {
        title: tarefa.title,
        time: (Number.isInteger(tarefa.time)) ? this.convertDate(tarefa.time) : tarefa.time,
      };

      TaskDataService.create(data)
        .then((response: ResponseData) => {
          //this.task.id = response.data.id;
          console.log(response.data);
          this.tarefas.push(response.data.data);
          //this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    convertDate(seconds: number) {
      console.log(seconds);
       return new Date(seconds*1000).toISOString().substring(11, 19)
    },

    retrieveTasks() {
      TaskDataService.getAll()
        .then((response: ResponseData) => {
          this.tarefas = response.data.data;
          console.log(response.data.data);
          //console.log(this.tasks);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateTask(tarefa:ITarefa) {
      TaskDataService.update(tarefa.id, tarefa)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "Task was updated!";
          this.retrieveTasks();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteTask(tarefa:ITarefa) {
      //tarefa.deleting = true;
      TaskDataService.delete(tarefa.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          //this.$router.push({ name: "tutorials" });
          //tarefa.deleting =
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
