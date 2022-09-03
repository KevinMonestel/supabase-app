<template>
  <header class="bg-white shadow-md py-2">
    <div class="container-app">
      <div class="flex justify-between">
        <div>

        </div>

        <div>
          <nav>
            <ul class="flex">
              <li class="nav-item">
                <NuxtLink href="/" class="nav-link-app">Home</NuxtLink>
              </li>
              <li v-if="!user" class="nav-item">
                <NuxtLink href="/auth/signin" class="nav-link-app">Sign In</NuxtLink>
              </li>
              <li v-if="!user" class="nav-item">
                <NuxtLink href="/auth/signup" class="nav-link-app">Sign Up</NuxtLink>
              </li>
              <li v-if="user" class="nav-item">
                <NuxtLink :href="'/tasks/' + user.id" class="nav-link-app">My tasks</NuxtLink>
              </li>
              <li v-if="user" class="nav-item">
                <button @click="handleLogOut" class="nav-link-app">Log Out</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  const handleLogOut = async () => {
    try {
      const { error } = await client.auth.signOut()

      if (error) throw error

      navigateTo('/')
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }
</script>