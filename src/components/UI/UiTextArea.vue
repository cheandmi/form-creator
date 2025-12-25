<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    label?: string
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
    rows?: number
  }>(),
  {
    placeholder: '',
    error: '',
    isRequired: false,
    isDisabled: false,
    rows: 3,
  }
)

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value)
  },
})

const stateClasses = computed(() => ({
  'ui-textarea--disabled': props.isDisabled,
  'ui-textarea--error': Boolean(props.error),
}))
</script>

<template>
  <div class="ui-textarea" :class="stateClasses">
    <div class="ui-textarea__input-container">
      <label v-if="label" class="ui-textarea__label">
        {{ label }}
        <span v-if="isRequired" class="ui-textarea__required">*</span>
      </label>

      <textarea
        v-model="model"
        class="ui-textarea__input"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :rows="rows"
      ></textarea>
    </div>

    <p v-if="error" class="ui-textarea__error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
.ui-textarea {
  display: block;
  position: relative;
}

.ui-textarea__input-container {
  background: var(--ui-bg);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.ui-textarea__label {
  font-size: 11px;
  line-height: 12px;
  height: 12px;
  text-transform: uppercase;
  color: var(--ui-label);
  user-select: none;
  margin-bottom: 4px;
}

.ui-textarea__required {
  color: var(--ui-error);
}

.ui-textarea__row:focus-within {
  border-color: var(--ui-line-strong);
}

.ui-textarea__input {
  border: 0;
  outline: none;
  background: transparent;
  color: var(--ui-text);
  font-size: 14px;
  width: 90%;
  padding: 8px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid var(--ui-line);
  resize: none;
}

.ui-textarea__input::placeholder {
  color: var(--ui-placeholder);
}

.ui-textarea__input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ui-textarea__error {
  margin: 0;
  font-size: 12px;
  color: var(--ui-error);
  margin-top: 6px;
}

.ui-textarea--disabled .ui-textarea__input {
  border-color: rgba(15, 23, 42, 0.1);
}

.ui-textarea--error .ui-textarea__input {
  border: 1px solid var(--ui-error);
}

.ui-textarea--error .ui-textarea__label {
  color: var(--ui-error);
}
</style>
