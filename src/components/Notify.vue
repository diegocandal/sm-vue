<template>
<div v-if="displayMsg" class="notify">
    <div class="notification is-success is-light">
      <strong>Done !</strong>
    </div>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NotifyItem',

    data () {
        return {
        display: true
        }
    },

    props: {
        displayMsg: {
            type: Boolean,
            default: false
        },
    },
})
</script>


<style scoped>

.notify {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>