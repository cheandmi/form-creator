<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const formId = computed(() => route.params.id?.toString() ?? '')
</script>

<template>
  <div class="form-details">
    <h2>Настройка формы: {{ formId }}</h2>
    <section>
      <h3>Поля</h3>
      <p>Список полей и типов появится здесь.</p>
    </section>

    <section>
      <h3>Валидация</h3>
      <p>Настройки валидации формы.</p>
    </section>
  </div>
</template>

<style scoped lang="scss">
.form-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.35);
}

.form-details h2 {
  margin: 0;
  font-size: 1.7rem;
}

.form-details section {
  background: rgba(255, 255, 255, 0.02);
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.form-details h3 {
  margin-top: 0;
}

.form-details p {
  margin-bottom: 0;
  color: #d3d3d3;
}
</style>
