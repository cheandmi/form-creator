<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import UIInput from '@/components/UI/UIInput.vue'
import UiSelect from '@/components/UI/UiSelect.vue'
import UiCheckbox from '@/components/UI/UiCheckbox.vue'
import UiButton from '@/components/UI/UiButton.vue'
import type { FieldItem, FieldType, RootState } from '@/store'

const store = useStore<RootState>()

const formTitle = ref('')
const fieldLabel = ref('')
const fieldType = ref<FieldType>('input')
const fieldPlaceholder = ref('')
const fieldRequired = ref(false)
const fieldOptions = ref('')

const fields = ref<FieldItem[]>([])

const typeOptions: { label: string; value: string }[] = [
  { label: 'Текст', value: 'input' },
  { label: 'Список', value: 'select' },
  { label: 'Чекбокс', value: 'checkbox' },
  { label: 'Текстовое поле', value: 'textarea' },
  { label: 'Тоггл', value: 'toggle' },
]

const isNeedPlaceholder = computed(
  () => fieldType.value === 'input' || fieldType.value === 'textarea'
)
const isNeedOptions = computed(() => fieldType.value === 'select')

const addField = () => {
  if (!fieldLabel.value.trim()) return
  const name = `field_${Date.now()}`
  const props: Record<string, unknown> = {}

  if (fieldRequired.value) props.isRequired = true
  if (isNeedPlaceholder.value && fieldPlaceholder.value.trim()) {
    props.placeholder = fieldPlaceholder.value.trim()
  }

  const field: FieldItem = {
    name,
    type: fieldType.value,
    label: fieldLabel.value.trim(),
    props: Object.keys(props).length ? props : undefined,
  }

  if (isNeedOptions.value) {
    const options = fieldOptions.value
      .split(',')
      .filter((value) => value.length)
      .map((value) => ({ label: value.trim(), value: value.trim() }))
    field.options = options
  }

  fields.value = [...fields.value, field]
  fieldLabel.value = ''
  fieldPlaceholder.value = ''
  fieldRequired.value = false
  fieldOptions.value = ''
}

const deleteField = (field: FieldItem) => {
  fields.value = fields.value.filter((item) => field.name !== item.name)
}

const changePosition = (currentIndex: number, direction: -1 | 1) => {
  const targetIndex = currentIndex + direction
  if (targetIndex < 0 || targetIndex >= fields.value.length) return
  const updatedFields = [...fields.value]
  const currentField = updatedFields[currentIndex]
  updatedFields[currentIndex] = updatedFields[targetIndex]
  updatedFields[targetIndex] = currentField
  fields.value = updatedFields
}

const createForm = () => {
  if (!fields.value.length) return
  store.commit('addForm', {
    title: formTitle.value.trim() || 'Новая форма',
    fields: fields.value,
  })
  formTitle.value = ''
  fields.value = []
}
</script>

<template>
  <div class="form-generator">
    <div class="form-generator__main">
      <div class="form-generator__container">
        <h2 class="form-generator__title">Создать форму</h2>
        <UIInput v-model="formTitle" label="Название формы" placeholder="Например, новая форма" />
        <UIInput v-model="fieldLabel" label="Label поля" placeholder="Например, Email" />
        <UiSelect
          v-model="fieldType"
          label="Тип поля"
          :options="typeOptions"
          placeholder="Выберите тип"
        />
        <UIInput
          v-if="isNeedPlaceholder"
          v-model="fieldPlaceholder"
          label="Подсказка для поля"
          placeholder="Например, введите текст"
        />
        <UiCheckbox v-model="fieldRequired" label="Обязательное поле" />
        <UIInput
          v-if="isNeedOptions"
          v-model="fieldOptions"
          label="Опции (через запятую)"
          placeholder="Личное, Работа, Другое"
        />

        <div class="form-generator__actions">
          <UiButton text="Добавить поле" @click="addField" />
        </div>
      </div>

      <div class="form-generator__fields">
        <h3 class="form-generator__fields-title">Список полей</h3>
        <div class="form-generator__list">
          <div v-for="(field, index) in fields" :key="field.name" class="form-generator__item">
            <div class="form-generator__item-info">
              <div class="form-generator__item-label">{{ field.label }}</div>
              <div class="form-generator__item-type">{{ field.type }}</div>
            </div>
            <div class="form-generator__item-actions">
              <UiButton text="Вверх" @click="changePosition(index, -1)" />
              <UiButton text="Вниз" @click="changePosition(index, 1)" />
              <UiButton text="Удалить" @click="deleteField(field)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <UiButton text="Создать форму" @click="createForm" />
  </div>
</template>

<style scoped lang="scss">
.form-generator {
  width: 400px;
  background: #ffffff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  box-sizing: border-box;
}

.form-generator__main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  overflow: hidden;
}

.form-generator__container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-generator__title {
  margin: 0px;
  font-size: 20px;
  color: var(--ui-accent);
}

.form-generator__fields-title {
  margin: 0px;
  font-size: 16px;
  color: var(--ui-accent);
}

.form-generator__actions {
  display: flex;
  justify-content: flex-start;
}

.form-generator__fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  overflow-y: auto;
}

.form-generator__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  overflow: auto;
}

.form-generator__item {
  display: grid;
  gap: 10px;
}

.form-generator__item-info {
  display: flex;
  justify-content: space-between;
}

.form-generator__item-label {
  font-size: 14px;
  color: var(--ui-accent);
}

.form-generator__item-type {
  font-size: 12px;
  color: var(--ui-accent);
  opacity: 0.5;
}

.form-generator__item-actions {
  display: flex;
  gap: 8px;
}
</style>
