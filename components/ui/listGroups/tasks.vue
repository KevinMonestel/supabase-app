<template>
  <div class="flex flex-col justify-center items-center">
    <div v-if="tasks.length === 0">
      <p class="text-center text-gray-400">Please, create a new task</p>
    </div>
    <ul class="bg-white rounded-lg border border-gray-200 text-gray-900 w-full">
      <li v-for="task of tasks" :key="task.id"
        class="p-2 border-b border-gray-200 rounded-t-lg flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div class="p-1">
          <p>{{ task.description }}</p>
          <small class="text-sm text-gray-400">{{ task.created_at }} (ID {{ task.id }})</small>
        </div>

        <div>
          <button v-on:click="deleteTaskEmit(task)"
            class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TaskType } from '~~/types/task/task';

const props = defineProps({
  tasks: {
    type: Array as PropType<TaskType[]>,
    required: false,
    default: []
  }
})

const emits = defineEmits(['deleteTaskEmit'])

const deleteTaskEmit = async (task: TaskType) => {
  await emits('deleteTaskEmit', task)
}
</script>