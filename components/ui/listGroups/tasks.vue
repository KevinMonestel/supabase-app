<template>
    <div class="flex flex-col justify-center items-center">
      <ul class="bg-white rounded-lg border border-gray-200 text-gray-900">
        <li v-for="task of tasks" :key="task.id" class="p-2 border-b border-gray-200 w-full rounded-t-lg flex justify-between items-center">
          <div class="p-1">
            <p>{{task.description}}</p>
            <small>{{task.created_at}} (ID {{task.id}})</small>
          </div>

          <div>
            <p v-if="deletingFlag" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md">Deleting...</p>
            <button v-else @click="deleteTaskEmit(task)" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Delete</button>
          </div>
        </li>
      </ul>
    </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { Task } from '../../../types/task';

  const props = defineProps({
    tasks:{
      type: Array as PropType<Task[]>,
      required: false,
      default: []
    }
  })

    let deletingFlag = ref(false)

  const emits = defineEmits(['deleteTaskEmit'])

  const deleteTaskEmit = async (task: Task) => {
    deletingFlag.value = true

    await emits('deleteTaskEmit', task)

    deletingFlag.value = false
  }
</script>