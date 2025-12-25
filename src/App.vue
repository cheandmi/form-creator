<script setup lang="ts">
import { ref } from 'vue'
import UIInput from '@/components/UI/UIInput.vue'

const email = ref('')
</script>

<template>
  <div class="app">
    <UIInput
      v-model="email"
      label="Email"
      placeholder="email@email.com"
      type="tel"
      clearable
      hint="Какой-то хинт"
    />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  color: #ffffff;
}
</style>
