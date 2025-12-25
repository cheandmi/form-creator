<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    type?: string
    placeholder?: string
    label?: string
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
    inputmode?: string
    maxlength?: number
  }>(),
  {
    type: 'text',
    error: '',
    isRequired: false,
    required: false,
    isDisabled: false,
  }
)

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value)
  },
})

const clearInput = (): void => {
  emit('update:modelValue', '')
}

const showClear = computed(() => props.modelValue.length)

const stateClasses = computed(() => ({
  'ui-input--disabled': props.isDisabled,
  'ui-input--error': Boolean(props.error),
}))
</script>

<template>
  <div class="ui-input" :class="stateClasses">
    <div class="ui-input__input-container">
      <label v-if="label" class="ui-input__label">
        {{ label }}
        <span v-if="isRequired" class="ui-input__required">*</span>
      </label>

      <div class="ui-input__row">
        <input
          v-model="model"
          class="ui-input__input"
          :type="type"
          :placeholder="placeholder"
          :disabled="isDisabled"
          :maxlength="maxlength"
          autocomplete="off"
        />

        <button v-if="showClear" type="button" class="ui-input__clear" @click="clearInput">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="square"
            />
          </svg>
        </button>
      </div>
    </div>

    <p v-if="error" class="ui-input__error">Ошибка</p>
  </div>
</template>

<style scoped lang="scss">
.ui-input {
  display: block;
  position: relative;
}

.ui-input__input-container {
  background: var(--ui-bg);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.ui-input__label {
  font-size: 11px;
  line-height: 12px;
  height: 12px;
  text-transform: uppercase;
  color: var(--ui-label);
  user-select: none;
  margin-bottom: 4px;
}

.ui-input__required {
  color: var(--ui-error);
}

.ui-input__row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  border: 1px solid var(--ui-line);
  width: 100%;
}

.ui-input__row:focus-within {
  border-color: var(--ui-line-strong);
}

.ui-input__input {
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--ui-text);
  font-size: 15px;
  line-height: 36px;
  height: 36px;
  padding: 0px 25px 0px 10px;
}

.ui-input__input::placeholder {
  color: var(--ui-placeholder);
}

.ui-input__input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ui-input__error {
  margin: 0;
  font-size: 12px;
  color: var(--ui-error);
  margin-top: 6px;
}

.ui-input__clear {
  color: rgba(15, 23, 42, 0.35);
  cursor: pointer;
  padding: 0px;
  background: none;
  position: absolute;
  right: 10px;
  top: 10px;
  outline: none;
  border: none;
}

.ui-input__clear:hover {
  color: rgba(15, 23, 42, 0.7);
}

.ui-input__clear svg {
  width: 16px;
  height: 16px;
}

.ui-input--disabled .ui-input__clear {
  display: none;
}

.ui-input--error .ui-input__row {
  border: 1px solid var(--ui-error);
}

.ui-input--error .ui-input__label {
  color: var(--ui-error);
}
</style>
