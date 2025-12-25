<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    label: string
    isDisabled?: boolean
  }>(),
  {
    isDisabled: false,
  }
)

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <label class="ui-checkbox">
    <input v-model="model" class="ui-checkbox__input" type="checkbox" :disabled="isDisabled" />
    <span class="ui-checkbox__label">{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.ui-checkbox__input {
  width: 16px;
  height: 16px;
  margin: 0;
  border: 1px solid var(--ui-line);
  accent-color: var(--ui-text);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
}

.ui-checkbox__label {
  color: var(--ui-text);
  font-size: 14px;
}

.ui-checkbox__input:disabled + .ui-checkbox__label {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
