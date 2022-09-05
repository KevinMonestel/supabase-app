<template>
  <div class="border p-2">
    <h1>Create a new task</h1>
    <FormKit type="form" @submit="handleSubmit" submit-label="Create" validation-label="sd" id="create-task-form">
      <FormKit type="text" name="description" label="Description" help="Please enter a description"
        validation="required" placeholder="" />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { reset } from '@formkit/core'
import { TaskType } from '~~/types/task'

const client = useSupabaseClient()

const emits = defineEmits(['addTaskEmit'])

const props = defineProps({
  user_id: {
    type: String,
    required: true
  }
})

const handleSubmit = async (formData: TaskType) => {
  const { data } = await client.from<TaskType>('tasks').upsert({
    description: formData.description,
    user_id: props.user_id
  });

  await emits('addTaskEmit', data[0])

  reset('create-task-form')
}
</script>