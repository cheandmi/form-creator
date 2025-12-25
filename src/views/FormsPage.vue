<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import FormView from '@/components/FormView.vue'
import FormGenerator from '@/components/FormGenerator.vue'
import type { FormDefinition, RootState } from '@/store'

const store = useStore<RootState>()

const forms = computed<FormDefinition[]>(() => store.state.forms)

const updateForm = (id: number, values: Record<string, unknown>) => {
  store.commit('updateFormValue', { id, values })
}

const resetForm = (id: number) => {
  store.commit('resetForm', id)
}
</script>

<template>
  <div class="forms-page">
    <FormGenerator />
    <div class="forms-page__content">
      <h1 class="forms-page__title">Формы</h1>
      <div class="forms-page__cards">
        <div v-for="form in forms" :key="form.id" class="forms-page__card">
          <h2 class="forms-page__form-title">{{ form.title }}</h2>
          <FormView
            :fields="form.fields"
            :model-value="form.values"
            :save-text="form.saveText"
            :cancel-text="form.cancelText"
            @update:model-value="(value) => updateForm(form.id, value)"
            @save="() => updateForm(form.id, form.values)"
            @cancel="() => resetForm(form.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.forms-page {
  display: flex;
  min-height: 100vh;
}

.forms-page__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
}

.forms-page__cards {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  flex: 1;
  gap: 30px;
}

.forms-page__card {
  flex: 1;
  min-width: 300px;
  max-width: 100%;
  min-height: 360px;
  background: var(--ui-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 12px 30px rgba(15, 23, 42, 0.08);
}

.forms-page__title {
  color: #0f172a;
  margin: 0px;
}

.forms-page__form-title {
  margin: 0px 0px 16px;
  font-size: 20px;
  color: #0f172a;
}
</style>
