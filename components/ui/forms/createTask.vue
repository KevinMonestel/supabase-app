<template>
  <div class="border p-2">
    <h1>Create a new task</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-control-app">
        <label  class="label-app">Description</label>
        <input type="text" v-model="viewModel.description" class="input-app" placeholder="Write a short description...">
      </div>

      <div class="form-control-app">
        <p v-if="creatingFlag" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md">Creating...</p>
        <button v-else class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit">Create</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Task } from '~~/types/task'

const client = useSupabaseClient()
let viewModel = ref({} as Task)
let creatingFlag = ref(false)

const emits = defineEmits(['addTaskEmit'])

const props = defineProps({
  user_id:{
    type: String,
    required: true
  }
})

const handleSubmit = async () => {
  creatingFlag.value = true

  if (!viewModel.value) return
  
  const { data } = await client.from<Task>('tasks').upsert({
    description: viewModel.value.description,
    user_id: props.user_id
  });

  await emits('addTaskEmit', data[0])

  viewModel.value = {} as Task

  creatingFlag.value = false
}
</script>