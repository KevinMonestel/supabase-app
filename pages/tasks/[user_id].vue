<template>
  <div class="flex flex-col lg:flex-row lg:justify-between gap-5">
    <div class="flex-1">
      <UiFormsCreateTask @add-task-emit="addTaskEmit" :user_id="user_id" />
    </div>

    <div class="flex-1">
      <UiListGroupsTasks :tasks="tasks" @delete-task-emit="deleteTaskEmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskType } from 'types/task/task';

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const client = useSupabaseClient()
let user_id: string = route.params.user_id.toString()

const { data: tasks } = await useAsyncData('tasks', async () => {
  const { data } = await client.from<TaskType>('tasks').select('id, description, user_id, created_at').eq('user_id', user_id).order('created_at')

  return data
})

const addTaskEmit = async (task: TaskType) => {
  await tasks.value.push(task)
}

const deleteTaskEmit = async (task: TaskType) => {
  await client.from<TaskType>('tasks').delete().match({ id: task.id })

  tasks.value = tasks.value.filter(obj => obj.id !== task.id)
}
</script>