<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    count : {{ $store.state.count }} <br>
    login : {{ $store.state.login }} <br>
    email : {{ $store.state.email }}
    <TheWelcome />
  </main>
</template>
