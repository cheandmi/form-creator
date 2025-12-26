<script setup lang="ts">
import { computed } from 'vue'
import UIInput from '@/components/UI/UIInput.vue'
import UiSelect from '@/components/UI/UiSelect.vue'
import UiCheckbox from '@/components/UI/UiCheckbox.vue'
import UiTextArea from '@/components/UI/UiTextArea.vue'
import UiToggle from '@/components/UI/UiToggle.vue'
import UiButton from '@/components/UI/UiButton.vue'

type FieldType = 'input' | 'select' | 'checkbox' | 'textarea' | 'toggle'

type SelectOption = {
  label: string
  value: string | number
}

type FieldDefinition = {
  name: string
  type: FieldType
  label: string
  props?: Record<string, unknown>
  options?: SelectOption[]
}

const props = withDefaults(
  defineProps<{
    title?: string
    fields: FieldDefinition[]
    modelValue: Record<string, unknown>
    saveText?: string
    cancelText?: string
  }>(),
  {
    title: '',
    saveText: 'Сохранить',
    cancelText: 'Отменить',
  }
)

const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

const model = computed({
  get: () => props.modelValue,
  set: (value: Record<string, unknown>) => {
    emit('update:modelValue', value)
  },
})

const updateField = (name: string, value: unknown) => {
  model.value = { ...model.value, [name]: value }
}

const getStringFieldValue = (name: string): string => {
  const value = model.value[name]
  return value === null || value === undefined ? '' : String(value)
}

const getSelectFieldValue = (name: string): string | number => {
  const value = model.value[name]
  if (value === null || value === undefined) return ''
  return value as string | number
}

const onSave = () => {
  emit('save')
}

const onCancel = () => {
  emit('cancel')
}
</script>

<template>
  <form class="form-view" @submit.prevent="onSave">
    <h2 v-if="title" class="form-view__title">{{ title }}</h2>
    <div class="form-view__fields">
      <div v-for="field in fields" :key="field.name" class="form-view__field">
        <UIInput
          v-if="field.type === 'input'"
          :model-value="getStringFieldValue(field.name)"
          :label="field.label"
          v-bind="field.props"
          @update:model-value="(value: string) => updateField(field.name, value)"
        />

        <UiSelect
          v-else-if="field.type === 'select'"
          :model-value="getSelectFieldValue(field.name)"
          :label="field.label"
          :options="field.options ?? []"
          v-bind="field.props"
          @update:model-value="(value: string | number) => updateField(field.name, value)"
        />

        <UiCheckbox
          v-else-if="field.type === 'checkbox'"
          :model-value="Boolean(model[field.name])"
          :label="field.label"
          v-bind="field.props"
          @update:model-value="(value: boolean) => updateField(field.name, value)"
        />

        <UiToggle
          v-else-if="field.type === 'toggle'"
          :model-value="Boolean(model[field.name])"
          :label="field.label"
          v-bind="field.props"
          @update:model-value="(value: boolean) => updateField(field.name, value)"
        />

        <UiTextArea
          v-else-if="field.type === 'textarea'"
          :model-value="getStringFieldValue(field.name)"
          :label="field.label"
          v-bind="field.props"
          @update:model-value="(value: string) => updateField(field.name, value)"
        />
      </div>
    </div>

    <div class="form-view__actions">
      <UiButton :text="cancelText" @click="onCancel" />
      <UiButton :text="saveText" @click="onSave" />
    </div>
  </form>
</template>

<style scoped lang="scss">
.form-view {
  display: grid;
  gap: 16px;
}

.form-view__title {
  margin: 0;
  font-size: 20px;
  color: #0f172a;
}

.form-view__fields {
  display: grid;
  gap: 16px;
}

.form-view__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
