<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import FormView from '@/components/FormView.vue'
import FormGenerator from '@/components/FormGenerator.vue'
import type { RootState } from '@/store'

const store = useStore<RootState>()

const forms = computed(() => store.state.forms)

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
      <h1 class="forms-page__title">Список форм</h1>
      <div class="forms-page__cards">
        <div v-for="form in forms" :key="form.id" class="forms-page__card">
          <FormView
            :title="form.title"
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
  height: 100vh;
  overflow: hidden;
}

.forms-page__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  overflow-y: auto;
}

.forms-page__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.forms-page__card {
  background: var(--ui-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 12px 30px rgba(15, 23, 42, 0.08);
}

.forms-page__title {
  color: #0f172a;
  margin: 0px;
}
</style>
