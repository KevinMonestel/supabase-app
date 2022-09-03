<template>
  <div>
    {{tasks}}
  </div>
</template>

<script setup lang="ts">
  import { Task } from 'types/task';

  const route = useRoute()
  const client = useSupabaseClient()
  let user_id:string = route.params.user_id.toString()

  const {data: tasks} = await useAsyncData('tasks', async () => {
    const { data } = await client.from<Task>('tasks').select('id, description, user_id, created_at').eq('user_id', user_id).order('created_at')

    return data
  }) 

  console.log(tasks.value)
</script>