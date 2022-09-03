<template>
  <div>
    <h2>Sign up for an account</h2>
    <form @submit.prevent="handleSignup">
      <div class="form-control-app">
        <label for="email" class="label-app">Email</label>
        <input id="email" type="email" v-model="email" class="input-app"/>
      </div>
      <div class="form-control-app">
        <label for="password" class="label-app">Password</label>
        <input id="password" type="password" v-model="password" class="input-app" autocomplete="on"/>
      </div>
      <div class="form-control-app">
        <button type="submit" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  const email = ref("")
  const password = ref("")
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  watchEffect(() => {
    if (user.value) {
      navigateTo('/')
    }
  })

  const handleSignup = async () => {
    try {
      // Use the Supabase provided method to handle the signup
      const { error } = await client.auth.signUp({
        email: email.value,
        password: password.value,
      })

      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }
</script>